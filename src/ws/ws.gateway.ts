import { SubscribeMessage, 
          WebSocketGateway, 
          WebSocketServer, 
          OnGatewayInit, 
          OnGatewayConnection, 
          OnGatewayDisconnect } from '@nestjs/websockets';

import { Server ,Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';

import { MessageService } from '../message/message.service';
import { UserActionService } from '../user-action/user-action.service';
import { userActionDTO, actionType } from '../models/userAction.model';
import { messageDTO } from '../models/message.model';
import { AuthGuard } from '@nestjs/passport';


@WebSocketGateway()
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  
  constructor(private readonly messageService:MessageService,
              private readonly useractionservice:UserActionService){}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
   }
  
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const useraction = new userActionDTO();
    useraction.actionType=actionType.disconnected;
    
    this.useractionservice.addUserAction(useraction);
   }
  
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    const useraction = new userActionDTO();
    useraction.actionType=actionType.connected;
    this.useractionservice.addUserAction(useraction);
   }

  @UseGuards(AuthGuard())
  @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, msgObject: {username:string,message:string}): void {
      const messageaction = new messageDTO();
      messageaction.userName=msgObject.username;
      messageaction.messageText=msgObject.message;
      this.messageService.addMessage(messageaction,msgObject.username);
      
      this.server.emit('msgToClient', msgObject.message);
  }

}
