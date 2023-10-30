import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePatientDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dni: string;
}
