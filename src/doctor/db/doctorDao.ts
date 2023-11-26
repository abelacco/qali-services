import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { FindDoctorDto } from '../dto/find-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

export interface IDoctorDao {
  create(createDoctoDto: CreateDoctorDto): Promise<Doctor>;

  findAll(findDoctorDto: FindDoctorDto): Promise<{ data: Doctor[]; total: number }>;
  
  findAllByPagination(findDoctorDto: FindDoctorDto): Promise<{ data: Doctor[]; total: number }>;

  findById(id: string): Promise<Doctor>;

  findByName(name: string): Promise<Doctor>;

  update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor>;

  remove(id: string): Promise<Doctor>;
}
