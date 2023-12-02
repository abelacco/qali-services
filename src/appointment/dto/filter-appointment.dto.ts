import { IsDateString, IsIn, IsMongoId, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class FilterAppointmentDto {
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
    @IsMongoId()
    doctorId: string;

    @IsOptional()
    @IsString()
    doctorName: string;

    @IsOptional()
    @IsString()
    @IsMongoId()
    patientId: string;

    @IsOptional()
    @IsString()
    patientName: string;

    @IsOptional()
    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate: string;

    @IsOptional()
    @IsNumber()
    fee: number;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1, 2])
    status: number;

    @IsOptional()
    @IsString()
    code: string;
}