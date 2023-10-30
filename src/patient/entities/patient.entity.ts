import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Patient extends Document {
  @Prop({
    type: String
  })
  name: string;

  @Prop({
    unique: true,
    type: String
  })
  phone: string;

  @Prop({
    type: String,
    required: false, 
  })
  dni: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);