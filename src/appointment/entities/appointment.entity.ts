import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Status } from 'src/common/constants';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Doctor', // Ref doctor
  })
  doctorId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Patient', // Ref Patient
  })
  patientId: string;
  x;
  @Prop({
    type: Date,
  })
  date: Date;

  @Prop({
    type: Number,
  })
  fee: number;

  @Prop({
    type: Number,
    enum: Status,
    default: 0,
  })
  status: number;

  @Prop({
    type: String,
  })
  code: string;

  @Prop({
    type: String,
  })
  voucher: string;

  @IsOptional()
  @Prop({
    type: Date,
  })
  createdAt: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
