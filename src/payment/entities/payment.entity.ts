import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PaymentStatus } from 'src/common/constants';

@Schema()
export class Payment {
  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Doctor',
  })
  doctorId: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  appointmentQ: number;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  transactionBeforeFee: number;

  @Prop({
    required: true,
    type: Number,
    min: 1,
  })
  doctorEarnings: number;

  @Prop({
    required: true,
    type: Number,
    min: 1,
  })
  qaliFee: number;

  @Prop({
    default: PaymentStatus.PENDING,
    type: Number,
  })
  status: 0 | 1;

  @Prop({
    type: Date,
    required: true,
  })
  paymentDate: Date;

  @Prop({
    type: String,
    default: null,
  })
  codeTransaction?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
