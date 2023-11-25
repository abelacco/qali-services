import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from './entities/doctor.entity';
import { MongoDbService } from './db/mongodb.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, MongoDbService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
    ]),
    CloudinaryModule,
  ],
  exports: [MongooseModule, DoctorService],
})
export class DoctorModule {}
