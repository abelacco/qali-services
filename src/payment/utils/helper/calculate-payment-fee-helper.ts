export function calculatePaymentFee({ total, comission }: { total: number, comission: number }) {
  const qaliFee: number = total * comission;
  const doctorEarnings: number = total - qaliFee;

  return {
    qaliFee,
    doctorEarnings,
  };
}