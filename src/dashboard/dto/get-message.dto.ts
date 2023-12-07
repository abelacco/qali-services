
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class GetMessageDto {
    @IsString()
    @IsOptional()
    clientId?: string;

    @IsString()
    @IsOptional()
    appointmentId?: string;

    @IsString()
    @IsOptional()
    clientName?: string;

    @IsString()
    @IsOptional()
    dni?: string;

    @IsString()
    @IsOptional()
    doctorId?: string;

    @IsString()
    @IsOptional()
    speciality?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    doctorPhone?: string;

    @IsDate()
    @IsOptional()
    date?: Date;

    @IsString()
    @IsOptional()
    step?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    modality?: number;

    @IsNumber()
    @IsOptional()
    attempts?: number;

    @IsString()
    @IsOptional()
    imageVoucher?: string;

    @IsNumber()
    @IsOptional()
    fee?: number;
}
