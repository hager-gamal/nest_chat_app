import { Entity, 
        Column, 
        ManyToOne } from "typeorm";
import { classToPlain } from "class-transformer";

import { UserEntity } from "./user.entity";
import { AbstractEntity } from "./abstract-entity";
import { userActionResponse } from "../models/userAction.model";


@Entity('userActions')
export class UserActionEntity extends AbstractEntity{
  
  @Column()
  roomName:string;
  
  @Column()
  actionType:string;

    @ManyToOne(
        type => UserEntity,
        user => user.actions,
      )
     user:UserEntity;

     username:string;
     toJSON(): userActionResponse {
      return <userActionResponse>classToPlain(this);
    }
  
}