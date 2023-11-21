import { Payment } from 'src/payment/entities/payment.entity';
import { IAppointmentResult } from 'src/payment/interfaces';
import { calculatePaymentFee } from './calculate-payment-fee-helper';
import { PaymentStatus } from 'src/common/constants';

export const transformIntoPayment = (
  appointmentsResult: IAppointmentResult[],
): Payment[] => {
  const paymentsModified: Payment[] = appointmentsResult.map((el) => {
    const calcFees = calculatePaymentFee(el.transactionBeforeFee);
    return {
      ...el,
      status: PaymentStatus.PENDING,
      qaliFee: calcFees.qaliFee,
      doctorEarnings: calcFees.doctorEarnings,
    };
  });
  return paymentsModified;
};
