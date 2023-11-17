import { PaginationDto, StartDateDto } from 'src/common/dto';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto';
import { Appointment } from '../entities/appointment.entity';

export interface IAppointmentDao {
  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;

  findAll(): Promise<Array<Appointment>>;

  findById(id: string): Promise<Appointment>;

  update(
    id: string,
    updateAppointmenttDto: UpdateAppointmentDto,
  ): Promise<Appointment>;

  remove(id: string): Promise<Appointment>;

  filterByDate(dateDto: StartDateDto): Promise<Appointment[]>;
}
