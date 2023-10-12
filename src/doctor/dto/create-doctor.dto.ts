import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateDoctorDto {

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    speciality: string;

    @IsNumber()
    fee: number;
}
