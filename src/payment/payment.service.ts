import {
  BadRequestException,
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';

import { AppointmentService } from 'src/appointment/appointment.service';
import { PaginationDto, StartDateDto } from 'src/common/dto';
import {
  CodeTransactionDto,
  CreateOnePaymentDto,
  CreatePaymentDto,
  FilterPaymentsDto,
} from './dto';
import { MongoDbService } from './db/mongodb.service';
import { Payment } from './entities/payment.entity';
import { IPaymentDao } from './db/paymentDao';
import {
  calculatePaymentFee,
  CalculateDoctorsAppointments,
  CalculateDate,
  transformIntoPayment,
  verifyIsMonday,
} from './utils/helper/';
import { DoctorService } from 'src/doctor/doctor.service';
import { ApiResponse } from 'src/common/models/api-response';
import { ApiResponseStatus } from 'src/common/constants';

@Injectable()
export class PaymentService {
  private readonly _db: IPaymentDao;
  constructor(
    @Inject(forwardRef(() => AppointmentService))
    private readonly _appointmentService: AppointmentService,
    readonly _mongoDbService: MongoDbService,
    readonly _doctorService: DoctorService,
  ) {
    this._db = _mongoDbService;
  }

  async createOne(createPaymentDto: CreateOnePaymentDto) {
    try {
      const calculateDates = CalculateDate(createPaymentDto.date.toString());
      const calculatedFees = calculatePaymentFee(
        createPaymentDto.transactionBeforeFee,
      );
      const finalPaymentObj: CreatePaymentDto = {
        appointmentQ: createPaymentDto.appointmentQ,
        doctorId: createPaymentDto.doctorId,
        transactionBeforeFee: createPaymentDto.transactionBeforeFee,
        startDate: calculateDates.startDate,
        endDate: calculateDates.endDate,
        paymentDate: calculateDates.paymentDate,
        doctorEarnings: calculatedFees.doctorEarnings,
        qaliFee: calculatedFees.qaliFee,
      };
      const createPayment = await this._db.createOnePayment(finalPaymentObj);
      return new ApiResponse(
        createPayment,
        'Payment create successfully!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const payments = await this._db.findAll(paginationDto);
      if (!payments) throw new NotFoundException('Could not found any Payment');
      return new ApiResponse(
        payments,
        'FindAll payments executed!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const payment = await this._db.findOneByID(id);
      if (!payment) throw new NotFoundException('Payment not found!');
      return new ApiResponse(
        payment,
        'Payment found!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async consolidatePaymentDoctor(startDate: StartDateDto) {
    try {
      const isMonday: number = verifyIsMonday(startDate.startDate);
      if (!isMonday)
        throw new BadRequestException('StartDate should be monday');
      const dates = CalculateDate(startDate.startDate);
      // trae las citas de la semana especificada
      const filteredData =
        await this._appointmentService.FilterAppointmentsByDate({
          startDate: dates.startDate.toISOString(),
          endDate: dates.endDate.toISOString(),
        });
      // todas las citas del mismo doctor durante la semana se suman y se vuelven una para crear payments
      const doctorsAppointments = CalculateDoctorsAppointments(filteredData);
      const modifiedPayments: Payment[] =
        transformIntoPayment(doctorsAppointments);
      // //* validar payments
      const validateConsolidates: Payment[] = await this.validateConsolidate(
        modifiedPayments,
      );
      if (!validateConsolidates.length)
        return new ApiResponse(
          {},
          'There is not new payments to consolidate!!',
          ApiResponseStatus.SUCCESS,
        );
      //* create payments
      const createPayments = await this._db.createManyPayments(
        validateConsolidates,
      );
      return new ApiResponse(
        createPayments,
        'Payments consolidated successfully!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async filterBy(filterPaymentDto: FilterPaymentsDto) {
    try {
      if (filterPaymentDto.doctorName) {
        const findDoctor = await this._doctorService.getByName(
          filterPaymentDto.doctorName,
        );
        const paymentsFiltered = await this._db.filterBy({
          doctorId: findDoctor._id,
        });
        return new ApiResponse(
          paymentsFiltered,
          `Payments filtered by doctor: ${filterPaymentDto.doctorName}!`,
          ApiResponseStatus.SUCCESS,
        );
      }
      const filteredPayments = await this._db.filterBy(filterPaymentDto);
      return new ApiResponse(
        filteredPayments,
        `Payments filtered successfully!`,
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, codeTransaction: CodeTransactionDto) {
    try {
      await this.findById(id);
      await this._db.updateStatus(id, codeTransaction);
      return new ApiResponse(
        {},
        'payment updated Successfully with status and codeTransaction!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.findById(id);
      await this._db.deletePayment(id);
      return new ApiResponse(
        {},
        'Payment removed successfully!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      await this._db.deleteAll();
      return new ApiResponse(
        {},
        'all Payments deleted successfully!',
        ApiResponseStatus.SUCCESS,
      );
    } catch (error) {
      throw error;
    }
  }

  private async validateConsolidate(
    consolidates: Payment[],
  ): Promise<Payment[]> {
    try {
      const results: Payment[] = [];

      await Promise.all(
        consolidates.map(async (el) => {
          const validate: boolean = await this._db.validateConsolidate(el);
          validate == false && results.push({ ...el });
        }),
      );
      return results;
    } catch (error) {
      throw error;
    }
  }
}
