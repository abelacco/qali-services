import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { MODALITY } from "src/common/constants";

export class CreateDoctorDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  speciality: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fee: number;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  // @IsIn([MODALITY.PRESENCIAL, MODALITY.VIRTUAL], { each: true })
  modality: number[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  office: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
