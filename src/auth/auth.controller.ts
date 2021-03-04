import { Controller,
         Body, 
         Post, 
         ValidationPipe } 
         from '@nestjs/common';

import { ApiOkResponse, 
          ApiBody, 
          ApiUnauthorizedResponse, 
          ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDTO, 
         AuthResponse, 
         LoginBody, 
         LoginDTO, 
         RegisterBody } from '../models/user.model';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/register')
    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBody({ type: RegisterBody })
    async register(
      @Body(ValidationPipe) credentials: RegisterDTO,
    ): Promise<AuthResponse> {
      const user = await this.authService.register(credentials);
      return user ;
    }
    
    @Post('/login')
    @ApiOkResponse({ description: 'User Login' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ type: LoginBody })
    async login(
      @Body(ValidationPipe) credentials: LoginDTO,
    ): Promise<AuthResponse> {
      const user = await this.authService.login(credentials);
      return user;
    }
}
