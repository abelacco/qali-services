import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AppointmentService } from 'src/appointment/appointment.service';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import {
  CodeTransactionDto,
  CreateOnePaymentDto,
  CreatePaymentDto,
  FilterPaymentDto,
} from './dto';
import { MongoDbService } from './db/mongodb.service';
import { Payment } from './entities/payment.entity';
import { IPaymentDao } from './db/paymentDao';
import {
  calculatePaymentFee,
  CalculateDoctorsAppointments,
  CalculateDate,
  transformIntoPayment,
} from './utils/helper/';
import { verifyIsMonday } from './utils/helper/isMonday-helper';

@Injectable()
export class PaymentService {
  private readonly _db: IPaymentDao;
  constructor(
    private readonly _appointmentService: AppointmentService,
    readonly _mongoDbService: MongoDbService,
  ) {
    this._db = _mongoDbService;
  }

  async createOne(createPaymentDto: CreateOnePaymentDto) {
    try {
      const calculateDates = CalculateDate(createPaymentDto.date.toString());
      const calculatedFees = calculatePaymentFee(
        createPaymentDto.transactionBeforeFee,
      );
      const finalPaymentObj: CreatePaymentDto = {
        appointmentQ: createPaymentDto.appointmentQ,
        doctorId: createPaymentDto.doctorId,
        transactionBeforeFee: createPaymentDto.transactionBeforeFee,
        startDate: calculateDates.startDate,
        endDate: calculateDates.endDate,
        paymentDate: calculateDates.paymentDate,
        doctorEarnings: calculatedFees.doctorEarnings,
        qaliFee: calculatedFees.qaliFee,
      };
      return this._db.createOnePayment(finalPaymentObj);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const payments = await this._db.findAll(paginationDto);
      if (!payments) throw new NotFoundException('Could not found any Payment');
      return payments;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const payment = await this._db.findOneByID(id);
      if (!payment) throw new NotFoundException('Payment not found!');
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async consolidatePaymentDoctor(startDate: StartDateDto) {
    try {
      const isMonday: number = verifyIsMonday(startDate.startDate);
      if (!isMonday)
        throw new BadRequestException('StartDate should be monday');
      const dates = CalculateDate(startDate.startDate);
      // trae las citas de la semana especificada
      const filteredData =
        await this._appointmentService.FilterAppointmentsByDate({
          startDate: dates.startDate.toISOString(),
          endDate: dates.endDate.toISOString(),
        });
      // todas las citas del mismo doctor durante la semana se suman y se vuelven una para crear payments
      const doctorsAppointments = CalculateDoctorsAppointments(filteredData);
      const modifiedPayments: Payment[] =
        transformIntoPayment(doctorsAppointments);
      // //* validar payments
      const validateConsolidates: Payment[] = await this.validateConsolidate(
        modifiedPayments,
      );
      if (!validateConsolidates.length) return;
      //* create payments
      const createPayments = await this._db.createManyPayments(
        validateConsolidates,
      );
      return createPayments;
    } catch (error) {
      throw error;
    }
  }

  async filterBy(filterPaymentDto: FilterPaymentDto) {
    const { date, doctorId } = filterPaymentDto;
    if (!date && !doctorId)
      throw new BadRequestException('need date or doctorId');
    if (date) {
      const calculateDates = CalculateDate(date);
      const newDates = {
        startDate: calculateDates.startDate.toISOString(),
        endDate: calculateDates.endDate.toISOString(),
      };
      return this._db.filterBy(newDates);
    }
    if (!date && doctorId) {
      return this._db.filterBy({ doctorId });
    }
  }

  async update(id: string, codeTransaction: CodeTransactionDto) {
    try {
      await this.findById(id);
      return await this._db.updateStatus(id, codeTransaction);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findById(id);
      await this._db.deletePayment(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this._db.deleteAll();
    } catch (error) {
      throw error;
    }
  }

  private async validateConsolidate(
    consolidates: Payment[],
  ): Promise<Payment[]> {
    try {
      const results: Payment[] = [];

      await Promise.all(
        consolidates.map(async (el) => {
          const validate: boolean = await this._db.validateConsolidate(el);
          validate == false && results.push({ ...el });
        }),
      );
      return results;
    } catch (error) {
      throw error;
    }
  }
}
