import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { UpdateDoctorDto } from "../dto/update-doctor.dto";
import { Doctor } from "../entities/doctor.entity";


export interface IDoctorDao {
  create(createDoctoDto: CreateDoctorDto): Promise<Doctor>;

  findAll(): Promise<Array<Doctor>>;

  findById(id: string): Promise<Doctor>;

  update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;

  remove(id: string): Promise<Doctor>;
}