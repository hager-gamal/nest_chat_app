import { Controller, 
         Post, 
         Body, 
         ValidationPipe, 
         Get, 
         UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, 
         ApiBody, 
         ApiOkResponse, 
         ApiUnauthorizedResponse, 
         ApiBearerAuth
        } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { messageDTO, messageResponse } from '../models/message.model';
import { MessageService } from './message.service';
import { UserEntity } from '../entities/user.entity';
import { User } from '../auth/user.decorator';

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService) {}

    @Post('/add')
    @ApiCreatedResponse({ description: 'message added' })
    @ApiBody({ type: messageDTO })
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async addMessage(
      @User() user :UserEntity,
      @Body(ValidationPipe) credentials: messageDTO) 
    :Promise<messageResponse> {
     
      const message = await this.messageService.addMessage(credentials,user.username);
      return message ;
    }
    
    @Get('/get')
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'getting user messages' })
    @ApiUnauthorizedResponse({ description: 'un authorized' })
    async getAllMessages()
    :Promise<messageResponse[]>{
      const messages = await this.messageService.getMessages();
      return messages ;
    }
    
}
