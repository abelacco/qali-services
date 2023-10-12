import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  
  constructor(
    @InjectModel(Doctor.name) 
    private doctorModel: Model<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try{
      const pokemon = await this.doctorModel.create(createDoctorDto);
      return pokemon;
    }
    catch(error){
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException('Pokemon already exists' + JSON.stringify(error.keyValue));
    }
    throw new InternalServerErrorException('Error creating pokemon' + JSON.stringify(error));
  }
}
