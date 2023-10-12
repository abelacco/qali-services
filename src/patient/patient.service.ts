import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { Patient } from './entities/patient.entity';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private readonly _patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const createPatient = new this._patientModel(createPatientDto);
      await createPatient.save();
      return createPatient;
    } catch (error) {
      if(error instanceof mongo.MongoError)
        mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(): Promise<Array<Patient>> {
    try {
      const results = await this._patientModel.find();
      if (!results) throw new NotFoundException('Could not find any patients');
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findOne(id: string): Promise<Patient> {
    try {
      const patient = await this._patientModel.findById(id);
      if (!patient) throw new NotFoundException('Patient not found');
      return patient;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<string> {
    try {
      const patient = await this._patientModel.findByIdAndUpdate(
        id,
        updatePatientDto,
      );
      if (!patient) throw new NotFoundException('Patient not found');
      return `Patient ${patient.id} updated successfully`;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const patient = await this._patientModel.findByIdAndDelete(id);
      if (!patient) throw new NotFoundException('Patient not found');
      return `Patient ${patient.id} deleted successfully`;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}
