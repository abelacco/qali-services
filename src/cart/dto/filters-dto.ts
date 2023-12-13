import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationMessageDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0) // offset must be greater than or equal to 0
    offset?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    clientName?: string;

}
