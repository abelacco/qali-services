import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { AppointmentService } from 'src/appointment/appointment.service';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import {
  CodeTransactionDto,
  CreateOnePaymentDto,
  CreatePaymentDto,
  FilterPaymentsDto,
  MainGetAllPaymentsWithFiltersDto,
} from './dto';
import { MongoDbService } from './db/mongodb.service';
import { Payment } from './entities/payment.entity';
import { IPaymentDao } from './db/paymentDao';
import {
  calculatePaymentFee,
  CalculateDoctorsAppointments,
  CalculateDate,
  // transformIntoPayment,
} from './utils/helper/';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class PaymentService {
  private readonly _db: IPaymentDao;
  constructor(
    @Inject(forwardRef(() => AppointmentService))
    private readonly _appointmentService: AppointmentService,
    readonly _mongoDbService: MongoDbService,
    readonly _doctorService: DoctorService,
  ) {
    this._db = _mongoDbService;
  }

  async MainGetAllPayments(
    queryDto: MainGetAllPaymentsWithFiltersDto,
  ): Promise<Payment[]> {
    try {
      const {
        doctorName,
        endDate,
        limit = 0,
        offset = 0,
        startDate,
        status,
      } = queryDto;
      await this.consolidatePaymentDoctor({ startDate, endDate });
      let results: Payment[];
      if (doctorName) {
        results = await this.filterBy({ doctorName, limit, offset });
      }
      if (!results && startDate && endDate) {
        results = await this.filterBy({ startDate, endDate, limit, offset });
      }
      if (!results && status) {
        results = await this.filterBy({ status, limit, offset });
      }
      if (!results) results = await this.findAll({ limit, offset });
      return results;
    } catch (error) {
      throw error;
    }
  }

  async createOne(createPaymentDto: CreateOnePaymentDto) {
    console.log('Iniciando Consolidacion');


    try {
      const calculateDates = CalculateDate(createPaymentDto.date);
      const calculatedFees = calculatePaymentFee({
        total: createPaymentDto.transactionBeforeFee,
        comission: createPaymentDto.doctorId.qaliComission
      });
      const finalPaymentObj: CreatePaymentDto = {
        appointmentQ: createPaymentDto.appointmentQ,
        doctorId: createPaymentDto.doctorId._id, // Convert doctorId to string
        transactionBeforeFee: createPaymentDto.transactionBeforeFee,
        startDate: calculateDates.startDate,
        endDate: calculateDates.endDate,
        paymentDate: calculateDates.paymentDate,
        doctorEarnings: calculatedFees.doctorEarnings,
        qaliFee: calculatedFees.qaliFee,
      };
      console.log('crear o actualizar consolidado inicio');
      return await this._db.createOnePayment(finalPaymentObj);
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
    // try {
    //   if (!startDate.startDate) startDate.startDate = new Date().toISOString();
    //   const dates = await CalculateDate(startDate.startDate);
    //   // trae las citas de la semana especificada
    //   const filteredData =
    //     await this._appointmentService.FilterAppointmentsByDate({
    //       startDate: dates.startDate.toISOString(),
    //       endDate: dates.endDate.toISOString(),
    //     });
    //   // todas las citas del mismo doctor durante la semana se suman y se vuelven una para crear payments
    //   const doctorsAppointments = CalculateDoctorsAppointments(filteredData);
    //   const modifiedPayments: Payment[] =
    //     transformIntoPayment(doctorsAppointments);
    //   // //* validar payments
    //   const validateConsolidates: Payment[] = await this.validateConsolidate(
    //     modifiedPayments,
    //   );
    //   if (!validateConsolidates.length) return;
    //   //* create payments
    //   return await this._db.createManyPayments(validateConsolidates);
    // } catch (error) {
    //   throw error;
    // }
  }

  async filterBy(filterPaymentDto: FilterPaymentsDto) {
    try {
      if (filterPaymentDto.doctorName) {
        const findDoctor = await this._doctorService.getByName(
          filterPaymentDto.doctorName,
        );
        return await this._db.filterBy({
          doctorId: findDoctor._id,
        });
      }
      return await this._db.filterBy(filterPaymentDto);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, codeTransaction: CodeTransactionDto) {
    try {
      await this.findById(id);
      await this._db.updateStatus(id, codeTransaction);
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
