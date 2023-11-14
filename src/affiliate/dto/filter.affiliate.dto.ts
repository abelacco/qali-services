import { IsOptional, IsString } from 'class-validator';

export class FilterAffiliateDto {
  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fullname?: string;
}
