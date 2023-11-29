import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AppointmentModule]
})
export class MessagesWsModule {}
