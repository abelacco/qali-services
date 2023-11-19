import { Injectable } from '@nestjs/common';
import { IAppointmentDao } from './appointmentDao';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { Appointment } from '../entities/appointment.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { PaginationDto, StartDateDto } from 'src/common/dto';

@Injectable()
export class MongoDbService implements IAppointmentDao {
  constructor(
    @InjectModel(Appointment.name)
    private readonly _appointmentModel: Model<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const createAppointment = new this._appointmentModel(
        createAppointmentDto,
      );
      await createAppointment.save();
      return createAppointment;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(): Promise<Array<Appointment>> {
    try {
      const results = await this._appointmentModel
        .find()
        .populate('doctorId')
        .populate('patientId')
        .exec();
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findById(id: string): Promise<Appointment> {
    try {
      const appointment = await this._appointmentModel
        .findById(id)
        .populate('doctorId')
        .populate('patientId')
        .exec();
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

  async filterByDate(dateDto: StartDateDto): Promise<Appointment[]> {
    try {
      const appointments = await this._appointmentModel
        .find({
          date: {
            $gte: dateDto.startDate,
            $lte: dateDto.endDate,
          },
        })
        .exec();
      return appointments;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}
