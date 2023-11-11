import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Status } from "src/common/constants";

@Schema()
export class Appointment extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Doctor',  // Ref doctor

  })
  doctorId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Patient',  // Ref Patient
  })
  patientId: string;

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
    default: 0
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
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
