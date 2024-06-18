import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { onlineMap } from './onlineMap';
@WebSocketGateway({ namespace: /\/ws-.+/ })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('login')
  handleLogin(
    @MessageBody() data: { id: number; channels: number[] },
    @ConnectedSocket() socket: Socket,
  ) {
    onlineMap[socket.nsp.name][socket.id] = data.id;
    socket.nsp.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
    data.channels.forEach((channel) => {
      console.log('login', `${socket.nsp.name}-${channel}`);

      socket.join(`${socket.nsp.name}-${channel}`);
    });
  }

  afterInit() {
    //소켓 서버가 생성된 후
    console.log('afterInit');
  }

  @SubscribeMessage('clientMessage')
  sendMessageFromClient(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    { url, content },
  ) {
    const returnedData = { ...content, url };
    socket
      .to(`${socket.nsp.name}-${content.ChannelId}`)
      .emit('message', returnedData);
  }

  @SubscribeMessage('clientDm')
  sendDmFromClient(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    data: {
      url: string;
      content: any;
      SenderId: string;
      ReceiverId: string;
    },
  ) {
    const receiverSocket = Object.keys(onlineMap[socket.nsp.name]).find(
      (socketId) => onlineMap[socket.nsp.name][socketId] === data.ReceiverId,
    );
    socket.to(receiverSocket).emit('dm', data);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    socket.emit('hello', socket.nsp.name);
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('handleDisconnect', onlineMap[socket.nsp.name]);

    delete onlineMap[socket.nsp.name][socket.id];
    socket.nsp.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
  }
}

//namespace안에 room들이 있는 구조
