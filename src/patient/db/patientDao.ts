import { Pagination } from "src/common/models/pagination";
import { CreatePatientDto  , UpdatePatientDto} from "../dto";
import { FilterPatientDto } from "../dto/filter-patient.dto";
import { Patient } from "../entities/patient.entity";
import { FindOnePatientDto } from "../dto/find-one-patient.dto";

export interface IPatientDao {
  create(createPatientDto: CreatePatientDto): Promise<Patient>;

  findAll(): Promise<Array<Patient>>;

  filterMany(query: FilterPatientDto): Promise<Pagination<Patient>>;
  
  findOneById(id: string): Promise<Patient>;

  findOneByParam(param: FindOnePatientDto): Promise<Patient>;
  
  findByPhone(phone: string): Promise<Patient>;

  update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;

  remove(id: string): Promise<Patient>;
}