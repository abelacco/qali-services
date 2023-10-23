import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { MongoDbService } from './db/mongodb.service';
import { IDoctorDao } from './db/doctorDao';
import { FindDoctorDto } from './dto/find-doctor.dto';

@Injectable()
export class DoctorService {
  private readonly _db: IDoctorDao
  constructor(
    readonly _mongoDbService: MongoDbService,
  ) {
    this._db = _mongoDbService
  }

  async addOne(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const createDoctor = this._db.create(createDoctorDto);
      return createDoctor;
    } catch (error) {
      throw error;
    }
  }

  async getAll(props?: FindDoctorDto): Promise<Array<Doctor>> {
    try {
      const results = await this._db.findAll(props);
      if (!results) throw new NotFoundException('Could not find any doctor');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Doctor> {
    try {
      const doctor = await this._db.findById(id);
      if (!doctor) throw new NotFoundException('Doctor not found');
      return doctor;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<string> {
    try {
      const doctor = await this._db.update(
        id,
        updateDoctorDto,
      );
      if (!doctor) throw new NotFoundException('Doctor not found');
      return `Doctor ${doctor.id} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const doctor = await this._db.remove(id);
      if (!doctor) throw new NotFoundException('Doctor not found');
      return `Doctor ${doctor.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }
}
