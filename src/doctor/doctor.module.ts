import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from './entities/doctor.entity';
import { MongoDbService } from './db/mongodb.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, MongoDbService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Doctor.name,
        schema: DoctorSchema,
      }
    ]),
  ],
  exports: [MongooseModule],
})
export class DoctorModule {}
