import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}