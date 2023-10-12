import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Doctor extends Document {
  @Prop({
    // unique: true,
    // index: true,
    type: String,
  })
  name: string;
  @Prop({
    unique: true,
    // index: true,
    type: String,
  })
  phone: string;

  @Prop({
    // unique: true,
    // index: true,
    type: String,
  })
  speciality: string;

  @Prop({
    // unique: true,
    // index: true,
    type: Number,
  })
  fee: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
