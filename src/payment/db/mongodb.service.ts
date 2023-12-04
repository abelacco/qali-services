import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { IPaymentDao } from './paymentDao';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '../entities/payment.entity';
import { Model, mongo } from 'mongoose';
import { PaginationDto } from 'src/common/dto';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { CodeTransactionDto, CreatePaymentDto, FilterPaymentsDto } from '../dto';
import { PaymentStatus } from 'src/common/constants';
import { CalculateDate } from '../utils/helper';
import { IFilterPaymentDb } from '../interfaces';
import { FindDoctorDto } from 'src/doctor/dto';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class MongoDbService implements IPaymentDao {
  constructor(
    @InjectModel(Payment.name)
    private readonly _payment: Model<Payment>,
    private readonly _doctorService: DoctorService
  ) {}

  async createOnePayment(createPayment: CreatePaymentDto): Promise<Payment> {
    try {
      const paymentExists = await this.validateCreateOne(createPayment);
      if (paymentExists) return paymentExists;

      return await this._payment.create(createPayment);
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async createManyPayments(
    createManyPayments: CreatePaymentDto[],
  ): Promise<Payment[]> {
    try {
      const data = await this._payment.insertMany(createManyPayments);
      return data;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Payment[]> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this._payment
        .find()
        .limit(limit)
        .skip(offset)
        .populate('doctorId')
        .exec();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findOneByID(id: string): Promise<Payment> {
    try {
      return await this._payment.findById(id).populate('doctorId').exec();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async filterBy(query: FilterPaymentsDto): Promise<Payment[]> {
    try {
      const {
        doctorName,
        startDate,
        paymentDate,
        status,
        limit = 10,
        offset = 0,
      } = query;

      let filters: any = {};

      if (status !== null && status !== undefined) {
        filters['status'] = status;
      }

      if (startDate) {
        filters['startDate'] = {
          $gte: new Date(`${startDate}T00:00:00.000Z`),
          $lte: new Date(`${startDate}T23:59:59.999Z`)
        };
      }

      if (paymentDate) {
        filters['paymentDate'] = {
          $gte: new Date(`${paymentDate}T00:00:00.000Z`),
          $lte: new Date(`${paymentDate}T23:59:59.999Z`)
        }
      }

      if (doctorName) {
        const queryInstance = new FindDoctorDto();
        queryInstance.name = doctorName;

        const doctors = await this._doctorService.getAllByPagination(queryInstance);
        const doctorIds = doctors.data.map((doctor) => doctor._id.toString());

        filters['doctorId'] = { $in: doctorIds };
      }

      return await this._payment
        .find(filters)
        .limit(limit)
        .skip(offset)
        .exec();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async updateStatus(
    _id: string,
    codeTransactionDto: CodeTransactionDto,
  ): Promise<void> {
    try {
      await this._payment.findByIdAndUpdate(_id, {
        status: PaymentStatus.PAYED,
        codeTransaction: codeTransactionDto.codeTransaction,
      });
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async deletePayment(_id: string): Promise<void> {
    try {
      await this._payment.findByIdAndDelete(_id);
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this._payment.deleteMany();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async validateConsolidate(consolidate: CreatePaymentDto): Promise<boolean> {
    try {
      const findPayment = await this._payment.findOne({
        startDate: consolidate.startDate.toString(),
        endDate: consolidate.endDate.toString(),
        doctorId: consolidate.doctorId,
      });

      if (!findPayment) return false;

      if (
        findPayment &&
        consolidate.appointmentQ !== findPayment.appointmentQ
      ) {
        await findPayment.updateOne({
          appointmentQ: consolidate.appointmentQ,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  // private async validateCreateOne(
  //   consolidate: CreatePaymentDto,
  // ): Promise<boolean> {
  //   try {
  //     const findPayment = await this._payment.findOne({
  //       startDate: consolidate.startDate.toString(),
  //       endDate: consolidate.endDate.toString(),
  //       doctorId: consolidate.doctorId,
  //     });
  //     console.log("findPayment", !findPayment)
  //     if (findPayment) {
  //       console.log("no encontre")
  //       return false;
  //     }
  //     console.log("sigo aqui")
  //     if (
  //       findPayment &&
  //       consolidate.appointmentQ !== findPayment.appointmentQ
  //     ) {
  //       await findPayment.updateOne({
  //         appointmentQ: findPayment.appointmentQ + consolidate.appointmentQ,
  //       });
  //     }
  //     return true;
  //   } catch (error) {
  //     if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
  //     else throw error;
  //   }
  // }

  public async findOneByDateRangeAndDoctorId({ startDate, endDate, doctorId }: { startDate: Date, endDate: Date, doctorId: string }) {
    try {
      const payment = await this._payment.findOne({
        startDate,
        endDate,
        doctorId
      });

      return payment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  private async validateCreateOne(consolidate: CreatePaymentDto): Promise<Payment> {
    try {
      // const startDateTimestamp = new Date(consolidate.startDate).getTime();
      // const endDateTimestamp = new Date(consolidate.endDate).getTime();

      const payment = await this.findOneByDateRangeAndDoctorId({
        startDate: consolidate.startDate,
        endDate: consolidate.endDate,
        doctorId: consolidate.doctorId
      });

      if (!payment) return null;

      const paymentUpdated = await payment.updateOne({
        appointmentQ: payment.appointmentQ + consolidate.appointmentQ,
        doctorEarnings: payment.doctorEarnings + consolidate.doctorEarnings,
        qaliFee: payment.qaliFee + consolidate.qaliFee
      });

      if (paymentUpdated.modifiedCount === 0) throw new NotImplementedException('Ocurrio un error al actualizar el registro del payment, intentalo de nuevo');

      return await this.findOneByDateRangeAndDoctorId({
        startDate: payment.startDate,
        endDate: payment.endDate,
        doctorId: payment.doctorId
      });
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
  
}
