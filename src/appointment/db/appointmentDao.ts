import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateAppointmentDto } from "../dto/update-appointment.dto";
import { Appointment } from "../entities/appointment.entity";


export interface IAppointmentDao {
  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;

  findAll(): Promise<Array<Appointment>>;

  findById(id: string): Promise<Appointment>;

  update(id: string, updateAppointmenttDto: UpdateAppointmentDto): Promise<Appointment>;

  remove(id: string): Promise<Appointment>;
}