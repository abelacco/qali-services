import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Doctor extends Document {
  @Prop({
    type: String,
  })
  name: string;
  @Prop({
    unique: true,
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
  })
  speciality: string;

  @Prop({
    type: Number,
  })
  fee: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
