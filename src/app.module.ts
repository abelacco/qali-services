import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { SeedModule } from './seed/seed.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationModule } from './notification/notification.module';
<<<<<<< HEAD
import { StoreModule } from './store/store.module';
=======
import { ApiPeruModule } from './api-peru/api-peru.module';
>>>>>>> eba16fd3de4667030171ffea266bcca48a028faa

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    DoctorModule,
    SeedModule,
    AppointmentModule,
    PatientModule,
    CloudinaryModule,
    NotificationModule,
<<<<<<< HEAD
    StoreModule,
=======
    ApiPeruModule,
>>>>>>> eba16fd3de4667030171ffea266bcca48a028faa
  ],
  providers: [AppService],
})
export class AppModule {}
