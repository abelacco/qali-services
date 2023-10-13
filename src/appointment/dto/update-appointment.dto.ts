import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum Status {
  PENDING = 0,
  CONFIRMED = 1,
  CANCELED = 2,
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(Status)
  @IsNotEmpty()
  status: number;
}
