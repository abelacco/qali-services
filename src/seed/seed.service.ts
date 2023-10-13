import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import {initialData} from './data'
import { Appointment } from 'src/appointment/entities/appointment.entity';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
    @InjectModel(Appointment.name)
    private _appointmentModel: Model<Appointment>,
  ) {}

  async excuteSeed() {
    await this.doctorModel.deleteMany({});
    await this._appointmentModel.deleteMany({});
    const data = initialData;
    await this.doctorModel.insertMany(data.doctor);
    await this._appointmentModel.insertMany(data.appointment);
    return 'Seed executed';
  }
}
