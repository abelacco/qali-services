import { Injectable, NotFoundException } from "@nestjs/common";
import { IPatientDao } from "./patientDao";
import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { Patient } from "../entities/patient.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { mongoExceptionHandler } from "src/common/mongoExceptionHandler";

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

  async findById(id: string): Promise<Patient> {
    try {
      const patient = await this._patientModel.findById(id);
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