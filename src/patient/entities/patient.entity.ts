import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class Patient extends Document {
  @ApiProperty()
  @Prop({
    type: String
  })
  name: string;

  @ApiProperty()
  @Prop({
    unique: true,
    type: String
  })
  phone: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: false, 
  })
  dni: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);