import { CreatePatientDto } from "../dto/create-patient.dto";
import { UpdatePatientDto } from "../dto/update-patient.dto";
import { Patient } from "../entities/patient.entity";

export interface IPatientDao {
  create(createPatientDto: CreatePatientDto): Promise<Patient>;

  findAll(): Promise<Array<Patient>>;

  findById(id: string): Promise<Patient>;

  update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;

  remove(id: string): Promise<Patient>;
}