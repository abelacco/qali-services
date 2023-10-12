import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly _doctorModel: Model<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      const newDoctor = new this._doctorModel(createDoctorDto);
      await newDoctor.save();
      return newDoctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) this.handleExceptions(error);
      else throw error;
    }
  }

  async findAll(): Promise<Array<Doctor>> {
    try {
      const result = await this._doctorModel.find();
      if (!result) throw new NotFoundException();
      return result;
    } catch (error) {
      if (error instanceof mongo.MongoError) this.handleExceptions(error);
      else throw error;
    }
  }

  async findOne(id: string): Promise<Doctor> {
    try {
      const doctor = await this._doctorModel.findById(id);
      if (!doctor) throw new NotFoundException();
      return doctor;
    } catch (error) {
      if (error instanceof mongo.MongoError) this.handleExceptions(error);
      else throw error;
    }
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<string> {
    try {
      const doctor = await this._doctorModel.findByIdAndUpdate(
        id,
        updateDoctorDto,
      );
      if (!doctor) throw new NotFoundException();
      return `Doctor ${doctor.id} updated successfully`;
    } catch (error) {
      if (error instanceof mongo.MongoError) this.handleExceptions(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this._doctorModel.findByIdAndDelete(id);
      if (!result) throw new NotFoundException();
      return `Doctor ${result.id} deleted successfully`;
    } catch (error) {
      if (error instanceof mongo.MongoError) this.handleExceptions(error);
      else throw error;
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        'Pokemon already exists' + JSON.stringify(error.keyValue),
      );
    }
    throw new InternalServerErrorException(
      'Error creating pokemon' + JSON.stringify(error),
    );
  }
}
