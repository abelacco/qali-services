import { Injectable, Query } from "@nestjs/common";
import { IAppointmentDao } from "./appointmentDao";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, mongo } from "mongoose";
import { mongoExceptionHandler } from "src/common/mongoExceptionHandler";
import { Appointment } from "../entities/appointment.entity";
import { UpdateAppointmentDto } from "../dto/update-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { PaginationDto } from "src/common/pagination.dto";



@Injectable()
export class MongoDbService implements IAppointmentDao {
  constructor(
    @InjectModel(Appointment.name) private readonly _appointmentModel: Model<Appointment>,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    try {
      const createAppointment = new this._appointmentModel(createAppointmentDto);
      await createAppointment.save();
      return createAppointment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(paginationDto?: PaginationDto): Promise<Array<Appointment>> {
    const {offset = 0, limit = 10, doctorId, patientId} = paginationDto;
    const aggregationPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'doctors', // Replace 'doctors' with the actual name of your doctors collection
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor',
        },
      },
      {
        $lookup: {
          from: 'patients', // Replace 'patients' with the actual name of your patients collection
          localField: 'patientId',
          foreignField: '_id',
          as: 'patient',
        },
      },
      { $unwind: '$doctor' },
      { $unwind: '$patient' },
      { $skip: offset },
      { $limit: limit },
    ];
    if (doctorId) {
      aggregationPipeline.push({
        $match: {
          'doctor.name': {$regex: new RegExp(doctorId, 'i')}
        }
      })
    }
    if (patientId) {
      aggregationPipeline.push({
        $match: {
          'patient.name': {$regex: new RegExp(patientId, 'i')}
        }
      })
    }
    try {
      const results = await this._appointmentModel.aggregate(aggregationPipeline).exec();
      console.log(results);
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findById(id: string): Promise<Appointment> {
    try {
      const appointment = await this._appointmentModel.findById(id);
      return appointment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const appointment = await this._appointmentModel.findByIdAndUpdate(
        id,
        updateAppointmentDto,
      );
      return appointment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<Appointment> {
    try {
      const appointment = await this._appointmentModel.findByIdAndDelete(id);
      return appointment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}