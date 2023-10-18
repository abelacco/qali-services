import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  code: number;
}