import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaymentDao } from './paymentDao';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '../entities/payment.entity';
import { Model, mongo } from 'mongoose';
import { PaginationDto } from 'src/common/dto';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { CodeTransactionDto, CreatePaymentDto } from '../dto';
import { PaymentStatus } from 'src/common/constants';
import { CalculateDate } from '../utils/helper';
import { IFilterPaymentDb } from '../interfaces';

@Injectable()
export class MongoDbService implements IPaymentDao {
  constructor(
    @InjectModel(Payment.name)
    private readonly _payment: Model<Payment>,
  ) {}

  async createOnePayment(createPayment: CreatePaymentDto): Promise<Payment> {
    try {
      const validatePayment = await this.validateCreateOne(createPayment);
      if (!validatePayment) return await this._payment.create(createPayment);
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

  async filterBy(filterPaymentData: IFilterPaymentDb): Promise<Payment[]> {
    try {
      const {
        startDate,
        endDate,
        doctorId,
        status,
        limit = 0,
        offset = 0,
      } = filterPaymentData;
      let results: Payment[];

      if (startDate && endDate) {
        results = await this._payment
          .find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate },
          })
          .populate('doctorId')
          .limit(limit)
          .skip(offset)
          .exec();
      }

      const thisWeek = CalculateDate(new Date().toISOString());
      if (!results && doctorId) {
        results = await this._payment
          .find({
            doctorId,
            startDate: { $gte: thisWeek.startDate },
            endDate: { $lte: thisWeek.endDate },
          })
          .populate('doctorId')
          .limit(limit)
          .skip(offset)
          .exec();
      }

      if (!results && status) {
        results = await this._payment
          .find({ status })
          .populate('doctorId')
          .limit(limit)
          .skip(offset)
          .exec();
      }

      if (!results) throw new NotFoundException('Could not found payments');
      return results;
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

  private async validateCreateOne(
    consolidate: CreatePaymentDto,
  ): Promise<boolean> {
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
          appointmentQ: findPayment.appointmentQ + consolidate.appointmentQ,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}
