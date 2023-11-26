import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { Patient } from './entities/patient.entity';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { MongoDbService } from './db/mongodb.service';
import { IPatientDao } from './db/patientDao';
import { findCreatePatientDto } from './dto';

@Injectable()
export class PatientService {
  private readonly _db: IPatientDao
  constructor(
    readonly _mongoDbService: MongoDbService,
  ) {
    this._db = _mongoDbService
  }

  async addOne(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const createPatient = this._db.create(createPatientDto);
      return createPatient;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<Patient>> {
    try {
      const results = await this._db.findAll();
      if (!results) throw new NotFoundException('Could not find any patients');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Patient> {
    try {
      const patient = await this._db.findById(id);
      if (!patient) throw new NotFoundException('Patient not found');
      return patient;
    } catch (error) {
      throw error;
    }
  }

  async getByPhone(phone: string): Promise<Patient> {
    try {
      const patient = await this._db.findByPhone(phone);
      if (!patient) throw new NotFoundException('Patient not found');
      return patient;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<string> {
    try {
      const patient = await this._db.update(
        id,
        updatePatientDto,
      );
      if (!patient) throw new NotFoundException('Patient not found');
      return `Patient ${patient.id} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async updateByPhone(
    phone: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<string> {
    try {
      const patient = await this.getByPhone(phone);
      console.log('patient', patient)
      this.update(patient.id, updatePatientDto)
      // const patient = await this._db.update(
      //   phone,
      //   updatePatientDto,
      // );
      return `Patient ${patient.name} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const patient = await this._db.remove(id);
      if (!patient) throw new NotFoundException('Patient not found');
      return `Patient ${patient.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }

  async findOrCreatePatient(findCreatePatientDto: findCreatePatientDto): Promise<Patient> {
    let phone = findCreatePatientDto.phone
    let patient:Patient
    try {
      patient = await this._db.findByPhone(phone);
      if(!patient) {
        patient = await this._db.create(findCreatePatientDto);
      }
      Logger.log('patient', patient)
      return patient;
    } catch (error) {
      throw error;
    }
  }
}
