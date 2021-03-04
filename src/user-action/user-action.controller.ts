import { Controller, Post, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { userActionDTO, userActionResponse } from '../models/userAction.model';
import { AuthGuard } from '@nestjs/passport';

import { UserActionService } from './user-action.service';


@Controller('user-action')
export class UserActionController {
    constructor(private userActionService:UserActionService) {}

    @Post('/add')
    @ApiCreatedResponse({ description: 'userAction added' })
    @ApiBody({ type: userActionDTO })
    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    async addMessage(
      @Body(ValidationPipe) credentials: userActionDTO) 
    :Promise<userActionResponse> {
      const message = await this.userActionService.addUserAction(credentials);
      return message ;
    }
}
