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
import { AffiliateModule } from './affiliate/affiliate.module';
import { StoreModule } from './store/store.module';
import { ApiPeruModule } from './api-peru/api-peru.module';
import { PaymentModule } from './payment/payment.module';
import { CulquiModule } from './culqui/culqui.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
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
    StoreModule,
    AffiliateModule,
    ApiPeruModule,
    PaymentModule,
    CulquiModule,
  ],
  providers: [AppService],
})
export class AppModule {}
