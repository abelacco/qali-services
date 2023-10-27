import { CreateDoctorDto } from "../dto/create-doctor.dto";
import { FindDoctorDto } from "../dto/find-doctor.dto";
import { UpdateDoctorDto } from "../dto/update-doctor.dto";
import { Doctor } from "../entities/doctor.entity";


export interface IDoctorDao {
  create(createDoctoDto: CreateDoctorDto): Promise<Doctor>;

  findAll(props?: FindDoctorDto): Promise<Array<Doctor>>;

  findById(id: string): Promise<Doctor>;

  update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;

  remove(id: string): Promise<Doctor>;
}