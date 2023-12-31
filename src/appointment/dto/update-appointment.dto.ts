// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/common/constants';



export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsEnum(Status)
  @IsOptional()
  status: number;
}
