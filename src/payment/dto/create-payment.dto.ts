import { IsDate, IsPositive, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  doctorId: string;

  @IsPositive()
  @Min(1)
  appointmentQ: number;

  @IsPositive()
  @Min(1)
  transactionBeforeFee: number;

  @IsPositive()
  @Min(1)
  doctorEarnings: number;

  @IsPositive()
  @Min(1)
  qaliFee: number;

  @IsDate()
  paymentDate: Date;
}
