import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  doctorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: number;

  @ApiProperty()
  @IsOptional()
  voucher?: string;
}