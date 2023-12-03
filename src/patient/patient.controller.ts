import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto , UpdatePatientDto , findCreatePatientDto} from './dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './entities/patient.entity';
import { FindOnePatientDto } from './dto/find-one-patient.dto';
import { FilterPatientDto } from './dto/filter-patient.dto';
import { ApiResponse as ApiResponseModel } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';

@ApiTags('Parient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiResponse({status: 201, description: 'Parient was creat', type: Patient})
  @ApiResponse({status: 400, description: 'Bad request'})
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.addOne(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.getAll();
  }

  @Get('findorcreate')
  findOrCreate(@Query() findCreatePatientDto: findCreatePatientDto) {
    Logger.log('findOrCreate controller')
    return this.patientService.findOrCreatePatient(findCreatePatientDto);
  }

  @Get('param')
  findOneByParam(@Query() param: FindOnePatientDto) {
    return this.patientService.getOneByParam(param);
  }

  @Get('filter')
  async filterManyByQuery(@Query() query: FilterPatientDto) {
    try {
      const response = await this.patientService.filterMany(query);

      return new ApiResponseModel(
        response,
        'Operacion exitosa',
        ApiResponseStatus.SUCCESS
      );
    } catch (error) {
      return new ApiResponseModel(
        null,
        'Error al filtrar los patients',
        ApiResponseStatus.ERROR
      );
    }
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.patientService.genOneById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id'
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Patch('')
  @ApiQuery({
    name: 'phone',
    required: true,
    type: String,
    description: 'Número de teléfono del paciente'
  })
  updateByPhone(@Query('phone') phone: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updateByPhone(phone, updatePatientDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }


}
