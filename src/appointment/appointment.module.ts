import { Module, forwardRef } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { MongoDbService } from './db/mongodb.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    forwardRef(() => NotificationModule),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, MongoDbService],
  exports: [MongooseModule, AppointmentService],
})
export class AppointmentModule {}
