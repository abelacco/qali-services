import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DoctorModule],
})
export class SeedModule {}
