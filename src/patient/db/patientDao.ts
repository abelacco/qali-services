import { CreatePatientDto  , UpdatePatientDto} from "../dto";
import { Patient } from "../entities/patient.entity";

export interface IPatientDao {
  create(createPatientDto: CreatePatientDto): Promise<Patient>;

  findAll(): Promise<Array<Patient>>;

  findById(id: string): Promise<Patient>;
  
  findByPhone(phone: string): Promise<Patient>;

  update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;

  remove(id: string): Promise<Patient>;
}