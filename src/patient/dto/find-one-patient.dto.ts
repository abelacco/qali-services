import { IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class FindOnePatientDto {
    @IsOptional()
    @IsString()
    @IsMongoId()
    _id: string;

    @IsOptional()
    @IsString()
    @IsPhoneNumber('PE', {
        message: 'El numero de telefono no es valido para el territorio de Peru'
    })
    phone: string;

    @IsOptional()
    @IsString()
    dni: string;
}