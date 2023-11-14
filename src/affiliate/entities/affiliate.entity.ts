import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Affiliate extends Document {
  @IsString()
  @Prop({
    minlength: 8,
    unique: true,
    required: true,
  })
  documentId: string;

  @IsString()
  @Prop({
    required: true,
    minlength: 4,
  })
  fullname: string;

  @IsString()
  @Prop({
    unique: true,
    required: true,
    minlength: 9,
  })
  phone: string;

  @IsBoolean()
  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);
