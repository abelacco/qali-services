import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import {
  CalculateDateResponse,
  TransformToString,
} from './interfaces/calculate-date-response.interfaces';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import { AppointmentService } from 'src/appointment/appointment.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly _appointmentService: AppointmentService,
    @InjectModel(Payment.name)
    private readonly _payment: Model<Payment>,
  ) {}

  private async create(createPaymentDto: CreatePaymentDto) {
    // try {
    //TODO talvez puedo usarlo como funcion interna y que reciba muchos payment para hacer insertMany
    //   const newDates = this.CalculateDate(createPaymentDto.date);
    //   const payment: Payment = await this._payment.create({
    //     ...createPaymentDto,
    //     startDate: newDates.startDate,
    //     endDate: newDates.endDate,
    //     paymentDate: newDates.paymentDate,
    //   });
    //   return payment;
    // } catch (error) {}
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this._payment
      .find()
      .limit(limit)
      .skip(offset)
      .populate('doctorId')
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async consolidatePaymentDoctor(startDate: Omit<StartDateDto, 'endDate'>) {
    //todo es para ver si funciona, => refactorizar todo en 3 capas
    const dates = this.CalculateDate(startDate.startDate);
    return await this._appointmentService.FilterAppointmentsByDate({
      startDate: dates.startDate.toISOString(),
      endDate: dates.endDate.toISOString(),
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  private CalculateDate(_date: string): CalculateDateResponse {
    // Convertir el string de fecha a un objeto Date
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

  private TransformStringDate(_date: CalculateDateResponse): TransformToString {
    return {
      startDate: _date.startDate.toISOString().substring(0, 10),
      endDate: _date.endDate.toISOString().substring(0, 10),
      paymentDate: _date.paymentDate.toISOString().substring(0, 10),
    };
  }
}
