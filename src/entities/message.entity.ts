import { AbstractEntity } from "./abstract-entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID } from "typeorm";
import { UserEntity } from "./user.entity";
import { messageResponse } from "../models/message.model";
import { classToPlain, Exclude } from "class-transformer";

@Entity('messages')
export class messageEntity extends AbstractEntity {
    
  @Column()
    messageText:String;
 
  @ManyToOne(
        type => UserEntity,
         user => user.messages
    )
  user:UserEntity;
  
  username:string;
  toJSON(): messageResponse {
    return <messageResponse>classToPlain(this);
  }

}