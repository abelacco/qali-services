import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient, PatientSchema } from './entities/patient.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbService } from './db/mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService, MongoDbService],
  exports: [MongooseModule, PatientService],
})
export class PatientModule {}
