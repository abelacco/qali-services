import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(8)
  documentId: string;

  @IsString()
  @MinLength(4)
  fullname: string;

  @IsString()
  @MinLength(9)
  phone: string;

  @IsString()
  @MinLength(10)
  @IsUrl()
  imageUrl: string;

  @IsString()
  codeQr: string;

  @IsString()
  lat: string;

  @IsString()
  long: string;

  @IsString()
  @MinLength(8)
  affiliater: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
