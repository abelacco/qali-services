import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

enum Status {
  PENDING = 0,
  CONFIRMED = 1,
  CANCELED = 2
}

@Schema()
export class Appointment {
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
