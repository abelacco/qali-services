import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {

  constructor(
    private configService: ConfigService,
  ) {}
  
  async confirmPayment(createNotificationDto: CreateNotificationDto) {
    const wspServicesUrl = this.configService.get<string>('WSP_SERVICES_DEPLOY');
    console.log(wspServicesUrl);
    const response = await axios.post(`${wspServicesUrl}/paymentStatus`, createNotificationDto);
    console.log(response);
    return response;
  }

 
}
