import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @IsString()
  @Prop({
    required: true,
    unique: true,
    minlength: 8,
  })
  documentId: string;

  @IsString()
  @Prop({
    required: true,
    minlength: 4,
    set: (value: string) => value.toLowerCase(),
  })
  fullname: string;

  @IsString()
  @Prop({
    required: true,
    minlength: 9,
    unique: true,
  })
  phone: string;

  @IsString()
  @Prop({
    required: true,
  })
  imageUrl: string;

  @IsString()
  @Prop({
    required: true,
  })
  codeQr: string;

  @IsString()
  @Prop({
    required: true,
  })
  lat: string;

  @IsString()
  @Prop({
    required: true,
  })
  long: string;

  @IsString()
  @Prop({
    required: true,
  })
  affiliater: string;

  @IsBoolean()
  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
