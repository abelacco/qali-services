import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DoctorModule, PatientModule],
})
export class SeedModule {}
