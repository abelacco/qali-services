import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class FilterPaymentDto {
  @IsOptional()
  @IsString()
  doctorName: string;

  @IsOptional()
  @IsString()
  date: string;
}

export class FilterPaymentsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  doctorName?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @IsDateString()
  paymentDate?: string;

  @IsOptional()
  @IsString()
  status?: '0' | '1';
}
