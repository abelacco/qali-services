import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DoctorModule, PatientModule, AppointmentModule],
})
export class SeedModule {}
