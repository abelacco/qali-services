import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import {initialData} from './data'


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Doctor.name) 
    private doctorModel: Model<Doctor>,

  ) {

  }

  async excuteSeed() {

    await this.doctorModel.deleteMany({});
    const  data = initialData
    await this.doctorModel.insertMany(data.doctor);
    return 'Seed executed';
  }
 
}
