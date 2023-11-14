import { IsEnum, IsIn, IsString } from "class-validator";
import { Status } from "src/common/constants";

export class CreateNotificationDto {

    @IsEnum(Status)
    @IsIn([Status.CONFIRMED, Status.CANCELED])
    status: Status;

    @IsString()
    id: string;

}
