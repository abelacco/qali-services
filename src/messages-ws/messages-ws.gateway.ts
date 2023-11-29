import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { AppointmentService } from 'src/appointment/appointment.service';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly appointmentService: AppointmentService,
    ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    console.log({token});
    // console.log('Cliente conectado:', client.id);
    this.messagesWsService.registerClient(client)
    // console.log({conectados: this.messagesWsService.getConnectedClients()});
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }
  
  handleDisconnect(client: Socket) {
    // console.log('Cliente desconectado:', client.id);
    this.messagesWsService.removeClient(client.id)

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

   @SubscribeMessage('message-from-client')
    onMessageFromClient( client: Socket, payload: NewMessageDto ){
      // console.log(client.id, payload);

      //     //! Emite únicamente al cliente.
      // client.emit('message-from-server', {
      //   fullName: 'Soy Yo!',
      //   message: payload.message || 'no-message!!'
      //   });

      //     //! Emitir a todos MENOS, al cliente inicial
      // client.broadcast.emit('message-from-server', {
      //   fullName: 'Soy Yo!',
      //   message: payload.message || 'no-message!!',
      // });

          this.wss.emit('message-from-server', {
          fullName: 'soy yo!',
          message: payload.message || 'no-message!!'
       });
    }

    @SubscribeMessage('get-appointments')
    async onGetAppointments(client: Socket) {
      try {
        const appointments = await this.appointmentService.getAll(); 
        
        client.emit('appointments-updated', appointments); 
        console.log('Appointments:', appointments);
      } catch (error) {
        console.error('Error al obtener citas:', error.message);
      }
    }


}

