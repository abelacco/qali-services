import { IsOptional, IsString } from 'class-validator';

export class StartDateDto {
  @IsString()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}
