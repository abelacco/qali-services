import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class findCreatePatientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

}
