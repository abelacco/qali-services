import { Payment } from 'src/payment/entities/payment.entity';
import { IAppointmentResult } from 'src/payment/interfaces';
import { calculatePaymentFee } from './calculate-payment-fee-helper';

export const transformIntoPayment = (
  appointmentsResult: IAppointmentResult[],
): Payment[] => {
  const paymentsModfied: Payment[] = appointmentsResult.map((el) => {
    const calcFees = calculatePaymentFee(el.transactionBeforeFee);
    return {
      ...el,
      status: 0,
      qaliFee: calcFees.qaliFee,
      doctorEarnings: calcFees.doctorEarnings,
    };
  });
  return paymentsModfied;
};
