import { AbstractEntity } from "./abstract-entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID } from "typeorm";
import { UserEntity } from "./user.entity";
import { messageResponse } from "../models/message.model";
import { classToPlain, Exclude } from "class-transformer";

@Entity('messages')
export class messageEntity extends AbstractEntity {
    
  userName:string;

  @Column()
    messageText:string;
 
  @ManyToOne(
        type => UserEntity,
         user => user.messages
    )
  user:UserEntity;
  
  toJSON(): messageResponse {
    return <messageResponse>classToPlain(this);
  }

}