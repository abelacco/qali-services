import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AppointmentService } from 'src/appointment/appointment.service';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class NotificationService {
  constructor(
    private configService: ConfigService,
    @Inject(forwardRef(() => AppointmentService))
    private readonly _appointmentService: AppointmentService,
    private readonly _paymentService: PaymentService,
  ) {}

  async confirmPayment(createNotificationDto: CreateNotificationDto) {
    const wspServicesUrl = this.configService.get<string>(
      'WSP_SERVICES_BACKEND',
    );
    const response = await axios.post(
      `${wspServicesUrl}/wsp/paymentStatus`,
      createNotificationDto,
    );
    const findAppointment = await this._appointmentService.getById(
      createNotificationDto.id,
    );

    await this._paymentService.createOne({
      appointmentQ: 1,
      date: findAppointment.createdAt,
      doctorId: findAppointment.doctorId,
      transactionBeforeFee: findAppointment.fee,
    });
    return response;
  }
}
