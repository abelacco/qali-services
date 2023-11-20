import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FindDoctorDto } from './dto/find-doctor.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  
  @Post()
  @ApiResponse({status: 201, description: 'Doctor was creat', type: Doctor})
  @ApiResponse({status: 400, description: 'Bad request'})
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.addOne(createDoctorDto);
  }

  @Get()
  findAll(@Query() props?: FindDoctorDto) {
    return this.doctorService.getAll(props);
  }

  @Get(':id')
  @ApiParam({
    name: 'id'
  })
  findOne(@Param('id') id: string) {
    return this.doctorService.getById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id'
  })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
