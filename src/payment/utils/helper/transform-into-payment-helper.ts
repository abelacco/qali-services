import { Payment } from 'src/payment/entities/payment.entity';
import { IAppointmentResult } from 'src/payment/interfaces';
import { calculatePaymentFee } from './calculate-payment-fee-helper';
import { PaymentStatus } from 'src/common/constants';

export const transformIntoPayment = (appointmentsResult: IAppointmentResult[]): Payment[] => {
  const paymentsModified: Payment[] = appointmentsResult.map((element) => {
    const calcFees = calculatePaymentFee({
      total: element.transactionBeforeFee,
      comission: 0.15
    });

    return {
      ...element,
      status: PaymentStatus.PENDING,
      qaliFee: calcFees.qaliFee,
      doctorEarnings: calcFees.doctorEarnings,
    };
  });
  return paymentsModified;
};
