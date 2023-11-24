import { IsEnum, IsIn, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/common/constants';

export class CreateNotificationDto {
  @IsEnum(AppointmentStatus)
  @IsIn([AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELED])
  status: AppointmentStatus;

  @IsString()
  id: string;
}
