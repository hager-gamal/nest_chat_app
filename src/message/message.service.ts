import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { messageEntity } from '../entities/message.entity';
import { messageDTO, messageResponse } from '../models/message.model';


@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(messageEntity) private messageRepo: Repository<messageEntity>){}

     /*async getMessages(user:UserDTO): Promise<messageDTO[]> {
        const username = user.username;
        const messages = await this.messageRepo.find({
                join: { 
                    alias: 'userMessages', 
                    innerJoin: { users: 'messages.users' } },
                where: 
                qb => {
                    /*
                  qb.where({ // Filter Role fields
                    a: 1,
                    b: 2
                  }).
                  qb.where('users.username = :userName', { userName: username }); // Filter related field
                }
        });
        return { ...messages.map(m=>m.toJSON())}; 
    }
    */
   
    async getMessages(): Promise<messageResponse[]> {
        //const username = user.username;
        try{
            const messages = await this.messageRepo.find({
                select:['messageText'],
                order:{
                    createdAt:"ASC"
                },
                relations:['user']
            });
            return { ...messages.map(m=>m.toJSON())}; 
        }
        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }

    async addMessage(message:messageDTO,username:string): Promise<messageResponse> { 
        try{
            
            message.userName =username;
            const createdMessage =  this.messageRepo.create(message);
            await createdMessage.save();
            return { ...createdMessage.toJSON()} ;
        }
        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }
}
