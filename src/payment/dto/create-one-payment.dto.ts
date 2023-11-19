import { IsDate, IsPositive, IsString, Min } from 'class-validator';

export class CreateOnePaymentDto {
  @IsDate()
  date: Date;

  @IsString()
  doctorId: string;

  @IsPositive()
  @Min(1)
  appointmentQ: number;

  @IsPositive()
  @Min(1)
  transactionBeforeFee: number;
}
