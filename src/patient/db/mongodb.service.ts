import { Injectable, NotFoundException } from "@nestjs/common";
import { IPatientDao } from "./patientDao";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { Patient } from "../entities/patient.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { mongoExceptionHandler } from "src/common/mongoExceptionHandler";
import { FilterPatientDto } from "../dto/filter-patient.dto";
import { Pagination } from "src/common/models/pagination";
import { FindOnePatientDto } from "../dto/find-one-patient.dto";

@Injectable()
export class MongoDbService implements IPatientDao {
  constructor(
    @InjectModel(Patient.name) private readonly _patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const createPatient = new this._patientModel(createPatientDto);
      await createPatient.save();
      return createPatient;
    } catch (error) {
      console.log('error', error)
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(): Promise<Array<Patient>> {
    try {
      const results = await this._patientModel.find();
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
  
  async filterMany(query: FilterPatientDto): Promise<Pagination<Patient>> {
    try {
      let filters: any = query;

      if (query.name) {
        filters['name'] = { $regex: query.name, $options: 'i' };
      }

      const limit = query.limit || 10;
      const offset = query.offset || 0;

      delete filters['limit'];
      delete filters['offset'];

      const data = await this._patientModel
        .find(filters)
        .limit(limit)
        .skip(offset)
        .exec();

      return new Pagination<Patient>(data, data.length, offset, limit);
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findOneById(id: string): Promise<Patient> {
    try {
      return this._patientModel.findById(id);
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findOneByParam(param: FindOnePatientDto): Promise<Patient> {
    try {
      const patient = await this._patientModel.findOne(param);
      return patient;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findByPhone(phone: string): Promise<Patient> {
    try {
      const patient = await this._patientModel.findOne({ phone: phone });
      return patient;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    try {
      const patient = await this._patientModel.findByIdAndUpdate(
        id,
        updatePatientDto,
      );
      return patient;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<Patient> {
    try {
      const patient = await this._patientModel.findByIdAndDelete(id);
      return patient;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}