import { IsNumber, IsOptional, IsPhoneNumber, IsPositive, IsString } from "class-validator";

export class FilterPatientDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset: number;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber("PE", {
        message: 'El numero de telefono no es valido para el territorio de Peru'
    })
    phone: string;
}