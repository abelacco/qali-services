// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { AppointmentStatus } from 'src/common/constants';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status: AppointmentStatus;
}
