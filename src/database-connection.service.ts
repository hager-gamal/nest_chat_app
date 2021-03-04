import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { messageEntity } from './entities/message.entity';
import { UserActionEntity } from './entities/userAction.entity';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      //username: process.env.DATABASE_USER,
      //password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      useUnifiedTopology:true,
      synchronize: true,
      dropSchema: false,
      logging: true,
      //entities: [ "dist/**/*.entity{.ts,.js}"],
      entities:[UserEntity ,messageEntity,UserActionEntity]
    };
  }
}
