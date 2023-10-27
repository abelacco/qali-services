import { Injectable, NotFoundException } from '@nestjs/common';
import { IAppointmentDao } from './db/appointmentDao';
import { MongoDbService } from './db/mongodb.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Status } from 'src/common/appointmentStatus';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class AppointmentService {
  private readonly _db: IAppointmentDao
  constructor(
    readonly _mongoDbService: MongoDbService,
    private readonly noficationService: NotificationService
  ) {
    this._db = _mongoDbService
  }

  async addOne(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    try {
      const createAppointment = this._db.create(createAppointmentDto);
      return createAppointment;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<Appointment>> {
    try {
      const results = await this._db.findAll();
      if (!results) throw new NotFoundException('Could not find any appointment');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Appointment> {
    try {
      const appointment = await this._db.findById(id);
      if (!appointment) throw new NotFoundException('Appointment not found');
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<any> {
    try {
      const appointment = await this._db.update(
        id,
        updateAppointmentDto,
      );
      if (!appointment) throw new NotFoundException('Appointment not found');
      let message = `Appointment ${appointment.id} updated successfully`
    
      return  appointment
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const appointment = await this._db.remove(id);
      if (!appointment) throw new NotFoundException('Appointment not found');
      return `Appointment ${appointment.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }

  async updateAndConfirmPayment(
      id: string,
      updateAppointmentDto: UpdateAppointmentDto,) {
    try {
        await this.update(id, updateAppointmentDto)
        let createNotificationDto = {
            status: updateAppointmentDto.status,
            id: id
        }
        if(updateAppointmentDto.status === Status.CONFIRMED || updateAppointmentDto.status === Status.CANCELED){
            this.noficationService.confirmPayment(createNotificationDto)
        }
    } catch (error) {
      throw error;
    }
  }
}
