import { IsOptional, IsString } from 'class-validator';

export class FilterPaymentDto {
  @IsOptional()
  @IsString()
  doctorId: string;

  @IsOptional()
  @IsString()
  date: string;
}
