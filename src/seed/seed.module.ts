import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { PatientModule } from 'src/patient/patient.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DoctorModule, PatientModule, AppointmentModule, StoreModule],
})
export class SeedModule {}
