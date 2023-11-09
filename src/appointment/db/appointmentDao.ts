import { PaginationDto } from "src/common/pagination.dto";
import { CreateAppointmentDto , UpdateAppointmentDto} from "../dto";
import { Appointment } from "../entities/appointment.entity";



export interface IAppointmentDao {
  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;

  findAll( paginationDto: PaginationDto ): Promise<Array<Appointment>>;

  findById(id: string): Promise<Appointment>;

  update(id: string, updateAppointmenttDto: UpdateAppointmentDto): Promise<Appointment>;

  remove(id: string): Promise<Appointment>;
}