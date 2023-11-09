import { IsOptional, IsPositive, IsString, Min } from "class-validator";



export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    offset?: number;

    @IsOptional()
    @IsString()
    doctorId?: string;

    @IsOptional()
    @IsString()
    patientId?: string;
}