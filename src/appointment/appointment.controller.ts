import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
import { FilterAppointmentDto } from './dto/filter-appointment.dto';
import { ApiResponse as ApiResponseModel } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';


@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiResponse({status: 201, description: 'Appointment was creat', type: Appointment})
  @ApiResponse({status: 400, description: 'Bad request'})
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.addOne(createAppointmentDto);
  } 

  @Get()
  findAll() {
    return this.appointmentService.getAll();
  }

  @Get('filter')
  async filterAppointments(@Query() query: FilterAppointmentDto) {
    try {
      const response = await this.appointmentService.filterAppointments(query);

      return new ApiResponseModel(
        response,
        'Operacion exitosa',
        ApiResponseStatus.SUCCESS
      );
    } catch (error) {
      return new ApiResponseModel(
        null,
        'Error al filtrar los appointments',
        ApiResponseStatus.ERROR
      );
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id'
  })
  findOne(@Param('id') id: string) {
    return this.appointmentService.getById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id'
  })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Patch('update/status/:id')
  @ApiParam({
    name: 'id'
  })
  updateStatus(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.updateAndConfirmPayment(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id'
  })
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
