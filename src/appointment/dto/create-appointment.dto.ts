import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsDate()
  date: Date;

  @IsNumber()
  fee: number;

  @IsOptional()
  @IsString()
  code?: number;

  @IsOptional()
  voucher?: string;
}