import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { WsModule } from './ws/ws.module';
import { UserActionModule } from './user-action/user-action.module';


@Module({
  imports: [ 
    WsModule,
   //ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }), 
 
    AuthModule,
    MessageModule,
    ConfigModule,
    UserActionModule,
 
],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
