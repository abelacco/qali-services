import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/common/appointmentStatus';



export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(Status)
  @IsNotEmpty()
  status: number;
}
