export function calculatePaymentFee(total: number) {
  const qaliFee: number = total * 0.15;
  const doctorEarnings: number = total - qaliFee;
  return {
    qaliFee,
    doctorEarnings,
  };
}
