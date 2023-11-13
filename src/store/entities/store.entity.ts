import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @IsString()
  documentId: string;

  fullname: string;

  phone: string;

  imageUrl: string;

  codeQr: string;

  lat: string;

  long: string;

  affiliater: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
