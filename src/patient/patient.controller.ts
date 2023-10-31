import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto , UpdatePatientDto , findCreatePatientDto} from './dto';


@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }


}
