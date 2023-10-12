import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Doctor extends Document{

    @Prop({
        // unique: true,
        // index: true,
    })
    name: string;
    @Prop({
        unique: true,
        // index: true,
    })
    phone: string;
    
    @Prop({
        // unique: true,
        // index: true,
    })
    speciality: string;

    @Prop({
        // unique: true,
        // index: true,
    })
    fee: number;

}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
