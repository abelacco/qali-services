import { Payment } from '../entities/payment.entity';

export interface IPaymentWithoutStatus extends Omit<Payment, 'status'> {}
