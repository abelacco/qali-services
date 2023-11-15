import { IsOptional, IsString } from 'class-validator';

export class FilterStoreDto {
  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  affiliateId?: string;
}
