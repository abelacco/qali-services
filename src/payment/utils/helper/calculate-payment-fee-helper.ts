export function calculatePaymentFee(total: number) {
  // se debe obterne la comision qali de la base de datos(modelo del doctor)
  const qaliFee: number = total * 0.15;
  const doctorEarnings: number = total - qaliFee;
  return {
    qaliFee,
    doctorEarnings,
  };
}
