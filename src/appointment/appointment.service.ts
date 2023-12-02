import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IAppointmentDao } from './db/appointmentDao';
import { MongoDbService } from './db/mongodb.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Status } from 'src/common/constants';
import { NotificationService } from 'src/notification/notification.service';
import { StartDateDto } from 'src/common/dto';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';
import { Pagination } from 'src/common/models/pagination';

@Injectable()
export class AppointmentService {
  private readonly _db: IAppointmentDao;
  constructor(
    readonly _mongoDbService: MongoDbService,
    private readonly noficationService: NotificationService,
  ) {
    this._db = _mongoDbService;
  }

  async addOne(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    Logger.log(JSON.stringify(createAppointmentDto));
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
      if (!results)
        throw new NotFoundException('Could not find any appointment');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async filterAppointments(query: FilterAppointmentDto): Promise<Pagination<Appointment>> {
    try {
      return this._db.filter(query);
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
      const appointment = await this._db.update(id, updateAppointmentDto);
      if (!appointment) throw new NotFoundException('Appointment not found');
      let message = `Appointment ${appointment.id} updated successfully`;

      return appointment;
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
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    console.log('updateAndConfirmPayment');
    try {
      await this.update(id, updateAppointmentDto);
      let createNotificationDto = {
        status: updateAppointmentDto.status,
        id: id,
      };
      console.log(updateAppointmentDto);
      if (
        updateAppointmentDto.status === Status.CONFIRMED ||
        updateAppointmentDto.status === Status.CANCELED
      ) {
        console.log('confirm payment');
        this.noficationService.confirmPayment(createNotificationDto);
      }
    } catch (error) {
      throw error;
    }
  }

  async FilterAppointmentsByDate(startDateDto: StartDateDto) {
    try {
      return await this._mongoDbService.filterByDate(startDateDto);
    } catch (error) {
      throw error;
    }
  }
}
