import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto, CreatePaymentDto } from './dto';
import { PaginationDto, StartDateDto } from 'src/common/dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentService.create(createPaymentDto);
  // }

  @Get('/filter')
  filterByDates(@Query() dateDto: StartDateDto) {
    return this.paymentService.consolidatePaymentDoctor(dateDto);
  }

  @Get()
  findAll(@Query() paginationDto: Omit<PaginationDto, 'endDate'>) {
    return this.paymentService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
