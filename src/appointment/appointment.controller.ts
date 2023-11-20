import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';


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
