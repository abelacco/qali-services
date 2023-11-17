export interface IAppointmentResult {
  startDate: Date;
  endDate: Date;
  paymentDate: Date;
  transactionBeforeFee: number;
  doctorId: string;
  appointmentQ: number;
}
