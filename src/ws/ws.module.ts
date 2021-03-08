import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { WsGateway } from './ws.gateway';
import { UserActionService } from '../user-action/user-action.service';
import { MessageService } from '../message/message.service';
import { MessageModule } from '../message/message.module';
import { UserActionModule } from '../user-action/user-action.module';
import { UserActionEntity } from '../entities/userAction.entity';
import { messageEntity } from '../entities/message.entity';


@Module({
    imports:[   MessageModule,
                UserActionModule,
                PassportModule.register({ defaultStrategy: 'jwt' }),
                TypeOrmModule.forFeature([UserActionEntity]),
                TypeOrmModule.forFeature([messageEntity]),
            ],
    providers: [WsGateway,UserActionService,MessageService]
})
export class WsModule {
   
}
