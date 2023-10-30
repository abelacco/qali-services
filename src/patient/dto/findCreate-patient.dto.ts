import { IsString } from "class-validator";

export class findCreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

}
