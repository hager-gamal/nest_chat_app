import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserActionEntity } from '../entities/userAction.entity';
import { userActionDTO, userActionResponse } from '../models/userAction.model';

@Injectable()
export class UserActionService {

    constructor(
        @InjectRepository(UserActionEntity) private userActionRepo: Repository<UserActionEntity>){}
        
    async addUserAction(userAction:userActionDTO): Promise<userActionResponse> { 
        try{    
            const createduserAction =  this.userActionRepo.create(userAction);
                await createduserAction.save();
                return { ...createduserAction.toJSON()} ;
        }
        catch(error){
            throw new InternalServerErrorException(error.message);
        }
    }
}
