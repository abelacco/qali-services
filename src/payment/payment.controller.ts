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
import { CodeTransactionDto, CreateOnePaymentDto } from './dto';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { FilterPaymentDto } from './dto/filter-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('createOne')
  create(@Body() createOnePaymentDto: CreateOnePaymentDto) {
    return this.paymentService.createOne(createOnePaymentDto);
  }

  @Get('consolidate')
  consolidatePayments(@Query() dateDto: StartDateDto) {
    return this.paymentService.consolidatePaymentDoctor(dateDto);
  }

  @Get('filter')
  filterBy(@Query() filterPaymentDto: FilterPaymentDto) {
    return this.paymentService.filterBy(filterPaymentDto);
  }

  @Get()
  findAll(@Query() paginationDto: Omit<PaginationDto, 'endDate'>) {
    return this.paymentService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.paymentService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() codeTransactionDto: CodeTransactionDto,
  ) {
    return this.paymentService.update(id, codeTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.paymentService.remove(id);
  }

  @Delete('delete/all')
  deleteAll() {
    return this.paymentService.deleteAll();
  }
}
