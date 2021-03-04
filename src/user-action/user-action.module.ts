import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UserActionService } from './user-action.service';
import { UserActionController } from './user-action.controller';
import { UserActionEntity } from '../entities/userAction.entity';




@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserActionEntity])
  ],
  providers: [UserActionService],
  controllers: [UserActionController]
})
export class UserActionModule {}
