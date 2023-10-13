import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import {initialData} from './data'
import { Patient } from 'src/patient/entities/patient.entity';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
    @InjectModel(Patient.name)
    private patientModel: Model<Patient>,
  ) {}

  async excuteSeed() {
    await this.doctorModel.deleteMany();
    await this.patientModel.deleteMany();
    const data = initialData;
    await this.doctorModel.insertMany(data.doctor);
    await this.patientModel.insertMany(data.patient);
    return 'Seed executed';
  }
}
