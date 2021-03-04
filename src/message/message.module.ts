import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtService, JwtModule } from '@nestjs/jwt';


import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { messageEntity } from '../entities/message.entity';
import { AppConfigModule } from '../config/configuration.module';
import { AppConfigService } from '../config/configuration.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserEntity } from '../entities/user.entity';

@Module({
  providers: [MessageService,JwtStrategy,AppConfigService],
  imports:[
    AppConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([messageEntity]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
   
  ],
 
  controllers: [MessageController]
})
export class MessageModule {}
