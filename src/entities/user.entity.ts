import {
    Entity,
    Column,
    BeforeInsert,
    OneToMany,
    CreateDateColumn,
    PrimaryColumn,
    BaseEntity,
    ObjectIdColumn,
  } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { messageEntity } from './message.entity';
import { UserActionEntity } from './userAction.entity';
import { UserResponse } from '../models/user.model';

  
  @Entity('users')
  export class UserEntity  extends BaseEntity{
   
    @PrimaryColumn()
    @ObjectIdColumn()
    //@Number()
    //@Exclude()
    //@Column({ unique: true })
    _id: string;
    
    @Exclude()
    username:string;

    @IsEmail()
    @IsString()
    @MinLength(4)
    @ApiProperty()
    @Column({ unique: true })
    email: string;
  
    //@Column({ unique: true })
    //username: string;
     
    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ default: null, nullable: true })
    image: string | null;
  
    @Column()
    @Exclude()
    password: string;
  
    @OneToMany(
        type => messageEntity,
        message => message.user,
      )
    messages:messageEntity[]

    @OneToMany(
      type => UserActionEntity,
      userAction => userAction.user,
    )
     actions:UserActionEntity[];


    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    async comparePassword(attempt: string) {
      return await bcrypt.compare(attempt, this.password);
    }
  
    toJSON(): UserResponse {
      return <UserResponse>classToPlain(this);
    }
  
  }
  