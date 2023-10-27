import { IsOptional, IsString } from 'class-validator';

export class FindDoctorDto {
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  speciality: string;
}
