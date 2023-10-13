import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import {initialData} from './data'
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Patient } from 'src/patient/entities/patient.entity';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
    @InjectModel(Appointment.name)
    private _appointmentModel: Model<Appointment>,
    @InjectModel(Patient.name)
    private patientModel: Model<Patient>,
  ) {}

  async excuteSeed() {
    await this._appointmentModel.deleteMany({});
    await this.doctorModel.deleteMany();
    await this.patientModel.deleteMany();
    const data = initialData;
    await this.doctorModel.insertMany(data.doctor);
    await this.patientModel.insertMany(data.patient);
    await this._appointmentModel.insertMany(data.appointment);
    return 'Seed executed';
  }
}
