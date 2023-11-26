import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FindDoctorDto } from './dto/find-doctor.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse as ApiResponseModel } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';
import { Pagination } from 'src/common/models/pagination';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  
  // @Post()
  // @ApiResponse({status: 201, description: 'Doctor was creat', type: Doctor})
  // @ApiResponse({status: 400, description: 'Bad request'})
  // create(@Body() createDoctorDto: CreateDoctorDto) {
  //   return this.doctorService.addOne(createDoctorDto);
  // }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({status: 201, description: 'Doctor was created', type: Doctor})
  @ApiResponse({status: 400, description: 'Bad request'})
  create(@UploadedFile() file: Express.Multer.File, @Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.addOne(createDoctorDto, file);
  }

  @Get()
  async findAll(@Query() props?: FindDoctorDto) {
    return this.doctorService.getAll(props);
    // try {
    //   const result = await this.doctorService.getAll(props);
      
    //   // Retorna directamente el resultado en el constructor de ApiResponseModel
    //   return new ApiResponseModel(
    //     result, 
    //     'Operación exitosa', 
    //     ApiResponseStatus.SUCCESS
    //   );
    // } catch (error) {
    //   // Maneja el error, devolviendo una respuesta de error
    //   return new ApiResponseModel(null, 'Error al obtener los doctores', ApiResponseStatus.ERROR);
    // }
  }

  @Get('paginate')
  async findAllByPagination(@Query() props?: FindDoctorDto) {
    try {
      const response = await this.doctorService.getAllByPagination(props);
      
      // Retorna directamente el resultado en el constructor de ApiResponseModel
      return new ApiResponseModel(
        response, 
        'Operación exitosa', 
        ApiResponseStatus.SUCCESS
      );
    } catch (error) {
      // Maneja el error, devolviendo una respuesta de error
      return new ApiResponseModel(null, 'Error al obtener los doctores', ApiResponseStatus.ERROR);
    }
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
