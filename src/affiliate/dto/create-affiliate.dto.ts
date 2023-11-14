import { IsString, MinLength } from 'class-validator';

export class CreateAffiliateDto {
  @IsString()
  @MinLength(8)
  documentId: string;

  @IsString()
  @MinLength(4)
  fullname: string;

  @IsString()
  @MinLength(9)
  phone: string;
}
