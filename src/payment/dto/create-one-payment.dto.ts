import { IsDate, IsObject, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateOnePaymentDto {
  @IsDate()
  date: Date;

  @IsOptional()
  doctorId: any;

  @IsPositive()
  @Min(1)
  appointmentQ: number;

  @IsPositive()
  @Min(1)
  transactionBeforeFee: number;
}
