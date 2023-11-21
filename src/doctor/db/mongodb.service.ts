import { Injectable, NotFoundException } from '@nestjs/common';
import { IDoctorDao } from './doctorDao';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { FindDoctorDto } from '../dto/find-doctor.dto';

@Injectable()
export class MongoDbService implements IDoctorDao {
  constructor(
    @InjectModel(Doctor.name) private readonly _doctorModel: Model<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const createDoctor = new this._doctorModel(createDoctorDto);
      await createDoctor.save();
      return createDoctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(props?: FindDoctorDto): Promise<Array<Doctor>> {
    try {
      const results = await this._doctorModel.find(props);
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findByName(name: string): Promise<Doctor> {
    try {
      const findDoctor: Doctor = await this._doctorModel.findOne({ name });
      if (!findDoctor) throw new NotFoundException('doctor not found!');
      return findDoctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findById(id: string): Promise<Doctor> {
    try {
      const doctor = await this._doctorModel.findById(id);
      return doctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    try {
      const doctor = await this._doctorModel.findByIdAndUpdate(
        id,
        updateDoctorDto,
      );
      return doctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<Doctor> {
    try {
      const doctor = await this._doctorModel.findByIdAndDelete(id);
      return doctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}
