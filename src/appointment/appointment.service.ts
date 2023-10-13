import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment.entity';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly _appointmentModel: Model<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const appointment = new this._appointmentModel(createAppointmentDto);
      await appointment.save();
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Array<Appointment>> {
    try {
      const result = await this._appointmentModel.find();

      if (!result) throw new NotFoundException();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Appointment> {
    try {
      const result = await this._appointmentModel.findById(id);
      if (!result) throw new NotFoundException();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<string> {
    try {
      const result = await this._appointmentModel.findByIdAndUpdate(
        id,
        updateAppointmentDto,
      );
      if (!result) throw new NotFoundException();

      return `Appointment ${result.id} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this._appointmentModel.findByIdAndDelete(id);
      if (!result) throw new NotFoundException();

      return `Appointment ${result.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }
}
