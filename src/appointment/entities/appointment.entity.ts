import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { AppointmentStatus } from 'src/common/constants';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @ApiProperty()
  @Prop({
    type: Types.ObjectId,
    ref: 'Doctor', // Ref doctor
  })
  doctorId: string;

  @ApiProperty()
  @Prop({
    type: Types.ObjectId,
    ref: 'Patient', // Ref Patient
  })
  patientId: string;

  @ApiProperty()
  @Prop({
    type: Date,
  })
  date: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: null,
  })
  payment_date: Date;

  @ApiProperty()
  @Prop({
    type: Number,
  })
  fee: number;

  @ApiProperty()
  @Prop({
    type: String,
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  code: string;

  @ApiProperty()
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
