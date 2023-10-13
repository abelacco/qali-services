import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsNumber()
  @IsNotEmpty()
  fee: number;
}
