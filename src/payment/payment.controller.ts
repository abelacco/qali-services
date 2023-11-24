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
import {
  CodeTransactionDto,
  CreateOnePaymentDto,
  FilterPaymentsDto,
  MainGetAllPaymentsWithFiltersDto,
} from './dto';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('createOne')
  async create(@Body() createOnePaymentDto: CreateOnePaymentDto) {
    const response = await this.paymentService.createOne(createOnePaymentDto);
    return new ApiResponse(
      response,
      'Payment create successfully!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Get('consolidate')
  async consolidatePayments(@Query() dateDto: StartDateDto) {
    const response = await this.paymentService.consolidatePaymentDoctor(
      dateDto,
    );
    return new ApiResponse(
      response,
      'Payments consolidated successfully!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Get()
  async findAll(@Query() paginationDto: Omit<PaginationDto, 'endDate'>) {
    const response = await this.paymentService.findAll(paginationDto);
    return new ApiResponse(
      response,
      'FindAll payments executed!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const response = await this.paymentService.findById(id);
    return new ApiResponse(
      response,
      'Payment found!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Get('filter')
  async filterBy(@Query() filterPaymentsDto: FilterPaymentsDto) {
    const response = await this.paymentService.filterBy(filterPaymentsDto);
    if (filterPaymentsDto.doctorName) {
      return new ApiResponse(
        response,
        `Payments filtered by doctor: ${filterPaymentsDto.doctorName}!`,
        ApiResponseStatus.SUCCESS,
      );
    }
    return new ApiResponse(
      response,
      `Payments filtered successfully!`,
      ApiResponseStatus.SUCCESS,
    );
  }

  @Get('all/main')
  async mainGetAllPayments(
    @Query() queryDto: MainGetAllPaymentsWithFiltersDto,
  ) {
    const response = await this.paymentService.MainGetAllPayments(queryDto);
    return new ApiResponse(
      response,
      'Payments returned successfully!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() codeTransactionDto: CodeTransactionDto,
  ) {
    await this.paymentService.update(id, codeTransactionDto);
    return new ApiResponse(
      { id },
      'payment updated Successfully with status and codeTransaction!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    await this.paymentService.remove(id);
    return new ApiResponse(
      {},
      'Payment removed successfully!',
      ApiResponseStatus.SUCCESS,
    );
  }

  @Delete('delete/all')
  async deleteAll() {
    await this.paymentService.deleteAll();
    return new ApiResponse(
      {},
      'all Payments deleted successfully!',
      ApiResponseStatus.SUCCESS,
    );
  }
}
