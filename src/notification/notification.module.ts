import { AppointmentModule } from 'src/appointment/appointment.module';
import { PaymentModule } from 'src/payment/payment.module';
import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PaymentModule, forwardRef(() => AppointmentModule)],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
