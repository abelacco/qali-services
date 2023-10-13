import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { MongoDbService } from './db/mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Appointment.name, schema: AppointmentSchema}
    ])
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, MongoDbService],
  exports: [MongooseModule]
})
export class AppointmentModule {}
