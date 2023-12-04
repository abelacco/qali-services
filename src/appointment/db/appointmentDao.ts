import { StartDateDto } from 'src/common/dto';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto';
import { Appointment } from '../entities/appointment.entity';
import { FilterAppointmentDto } from '../dto/filter-appointment.dto';
import { Pagination } from 'src/common/models/pagination';

export interface IAppointmentDao {
  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;

  findAll(): Promise<Array<Appointment>>;

  filter(query: FilterAppointmentDto): Promise<Pagination<Appointment>>;

  findById(id: string): Promise<Appointment>;

  update(
    id: string,
    updateAppointmenttDto: UpdateAppointmentDto,
  ): Promise<Appointment>;

  remove(id: string): Promise<Appointment>;

  filterByDate(dateDto: StartDateDto): Promise<Appointment[]>;
}
