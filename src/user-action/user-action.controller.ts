import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { userActionDTO, userActionResponse } from '../models/userAction.model';
import { UserActionService } from './user-action.service';


@Controller('user-action')
export class UserActionController {
    constructor(private userActionService:UserActionService) {}

    @Post('/add')
    @ApiCreatedResponse({ description: 'userAction added' })
    @ApiBody({ type: userActionDTO })
    async addMessage(
      @Body(ValidationPipe) credentials: userActionDTO) 
    :Promise<userActionResponse> {
      const message = await this.userActionService.addUserAction(credentials);
      return message ;
    }
}
