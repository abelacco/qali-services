import { PaginationDto } from 'src/common/dto';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto';
import { IFilterPaymentDb } from '../interfaces/filter-payment-db.interface';

export interface IPaymentDao {
  findAll(paginationDto: PaginationDto): Promise<Payment[]>;
  findOneByID(id: string): Promise<Payment>;
  createManyPayments(createPaymentDto: CreatePaymentDto[]): Promise<Payment[]>;
  createOnePayment(createPayment: CreatePaymentDto): Promise<Payment>;
  filterBy(filterPaymentDate: IFilterPaymentDb): Promise<Payment[]>;
  updateStatus(_id: string): Promise<void>;
  deletePayment(_id: string): Promise<void>;
  deleteAll(): Promise<void>;
  validateConsolidate(consolidate: CreatePaymentDto): Promise<boolean>;
}
