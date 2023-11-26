import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { MongoDbService } from './db/mongodb.service';
import { IDoctorDao } from './db/doctorDao';
import { FindDoctorDto } from './dto/find-doctor.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Pagination } from 'src/common/models/pagination';

@Injectable()
export class DoctorService {
  private readonly _db: IDoctorDao;
  constructor(readonly _mongoDbService: MongoDbService,
    private readonly cloudinaryService: CloudinaryService,) {
    this._db = _mongoDbService;
  }

  async addOne(createDoctorDto: CreateDoctorDto , imageFile: Express.Multer.File): Promise<Doctor> {
    try {
    // Subir la imagen a Cloudinary y obtener la URL
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(imageFile);
    const imageUrl = cloudinaryResponse.url;
    console.log(imageUrl);
    // Construir el objeto CreateDoctorDto con la URL de la imagen
    const finalDoctorData = {
      ...createDoctorDto,
      imageUrl: imageUrl
    };
    console.log("finalDoctorData with imageUrl",finalDoctorData);
    // Llamar al método de la base de datos para crear el doctor
    // return this.doctorDbService.addOne(finalDoctorData);
      const createDoctor = await this._db.create(finalDoctorData);
      console.log("return from service createdoctor",createDoctor);
      return createDoctor;
    } catch (error) {
      throw error;
    }
  }

  async getAll(props?: FindDoctorDto): Promise<Array<Doctor>> {
    try {
      const results = await this._db.findAll(props);
      if (results.total === 0) throw new NotFoundException('No existen doctores con esa coincidencia');
      return results.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllByPagination(props?: FindDoctorDto): Promise<Pagination<Doctor>> {
    try {
      const result = await this._db.findAllByPagination(props);
      if (result.total === 0) throw new NotFoundException('No existen doctores con esa coincidencia');
      const responsePagination = new Pagination<Doctor>(result.data, result.total, props.offset, props.limit);
      return responsePagination;
    } catch (error) {
      throw error;
    }
  }

  async getByName(name: string): Promise<Doctor> {
    try {
      return this._db.findByName(name);
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

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<string> {
    try {
      const doctor = await this._db.update(id, updateDoctorDto);
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
