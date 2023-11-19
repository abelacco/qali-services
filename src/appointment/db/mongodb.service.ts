import { Injectable } from '@nestjs/common';
import { IAppointmentDao } from './appointmentDao';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { Appointment } from '../entities/appointment.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

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
      const months = {
        '1': 'ENE',
        '2': 'FEB',
        '3': 'MAR',
        '4': 'ABR',
        '5': 'MAY',
        '6': 'JUN',
        '7': 'JUL',
        '8': 'AGO',
        '9': 'SEP',
        '10': 'OCT',
        '11': 'NOV',
        '12': 'DIC',
      };
      const createAppointment = new this._appointmentModel(
        createAppointmentDto,
      );
      const fechaActual = new Date();
      const fechaFormateada = `${fechaActual
        .getDate()
        .toString()
        .padStart(2, '0')}${months[(fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, '0')]}${fechaActual.getFullYear().toString().substr(-2)}`;
      const ultimaCita = await this._appointmentModel
        .findOne({
          code: { $regex: fechaFormateada },
        })
        .sort({ code: -1 })
        .exec();
      let ultimoNumero = 0;
      if (ultimaCita) {
        ultimoNumero = parseInt(ultimaCita.code.substr(-4), 10) + 1;
      }
      const nuevoNumero = ultimoNumero;
      const identificador = `${fechaFormateada}${nuevoNumero
        .toString()
        .padStart(4, '0')}`;
      createAppointment.code = identificador;
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
}
