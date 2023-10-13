import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "src/common/appointmentStatus";

@Schema()
export class Appointment extends Document {
  @Prop({
    type: String,
  })
  doctorId: string;

  @Prop({
    type: String,
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
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
