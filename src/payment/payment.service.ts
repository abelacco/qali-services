import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CalculateDateResponse } from './interfaces/calculate-date-response.interfaces';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { AppointmentService } from 'src/appointment/appointment.service';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import { CreateOnePaymentDto, CreatePaymentDto } from './dto';
import { MongoDbService } from './db/mongodb.service';
import { Payment } from './entities/payment.entity';
import { IPaymentDao } from './db/paymentDao';
import { IAppointmentResult } from './interfaces/appointment-result.interface';
import { FilterPaymentDto } from './dto/filter-payment.dto';

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
      const calculateDates = this.CalculateDate(
        createPaymentDto.date.toString(),
      );
      const calculatedFees = this.calculatePaymentFee(
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
    //todo => si hago la peticion otra vez se vuelve a crear !ARREGLAR
    try {
      const dates = this.CalculateDate(startDate.startDate);
      const filteredData =
        await this._appointmentService.FilterAppointmentsByDate({
          startDate: dates.startDate.toISOString(),
          endDate: dates.endDate.toISOString(),
        });
      // todas las citas del mismo doctor durante la semana se suman y se vuelven una para crear payments
      const doctorsAppointments =
        this.CalculateDoctorsAppointments(filteredData);
      const modifiedPayments = this.transformIntoPayment(doctorsAppointments);
      const createPayments = await this._db.createManyPayments(
        modifiedPayments,
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
      const calculateDates = this.CalculateDate(date);
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

  async update(id: string) {
    try {
      await this.findById(id);
      return await this._db.updateStatus(id);
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

  private CalculateDate(_date: string): CalculateDateResponse {
    const startDate = new Date(_date);
    // Calcular endDate sumando 7 días a startDate
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    // Calcular el próximo viernes cercano después de endDate
    const paymentDate = new Date(endDate);
    const diasHastaViernes = (5 - endDate.getDay() + 7) % 7;
    paymentDate.setDate(endDate.getDate() + diasHastaViernes);

    return {
      startDate,
      endDate,
      paymentDate,
    };
  }

  private CalculateDoctorsAppointments(
    appointments: Appointment[],
  ): IAppointmentResult[] {
    let result: IAppointmentResult[] = [];

    appointments.reduce((acc, el) => {
      if (!acc[el.doctorId]) {
        const generateDates = this.CalculateDate(el.date.toString());
        acc[el.doctorId] = {
          doctorId: el.doctorId,
          appointmentQ: 1,
          transactionBeforeFee: el.fee,
          startDate: generateDates.startDate,
          endDate: generateDates.endDate,
          paymentDate: generateDates.paymentDate,
        };
      } else {
        acc[el.doctorId].appointmentQ += 1;
        acc[el.doctorId].transactionBeforeFee += el.fee;
      }
      return acc;
    }, result);
    const resultArray = Object.values(result);

    return resultArray;
  }

  private calculatePaymentFee(total: number) {
    const qaliFee: number = total * 0.15;
    const doctorEarnings: number = total - qaliFee;
    return {
      qaliFee,
      doctorEarnings,
    };
  }

  private transformIntoPayment(appointmentsResult: IAppointmentResult[]) {
    const paymentsModfied = appointmentsResult.map((el) => {
      const calcFees = this.calculatePaymentFee(el.transactionBeforeFee);
      return {
        ...el,
        qaliFee: calcFees.qaliFee,
        doctorEarnings: calcFees.doctorEarnings,
      };
    });
    return paymentsModfied;
  }
}
