import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { MongoDbService } from './db/mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    AppointmentModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, MongoDbService],
  exports: [MongooseModule],
})
export class PaymentModule {}
