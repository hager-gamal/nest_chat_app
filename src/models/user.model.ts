import { 
  IsEmail,
  IsString,
  MinLength,
  MaxLength} from "class-validator";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';

export class UserDTO{
  username: string;
  _id:string;
}

export class LoginDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    @ApiProperty()
    email: string;
  
    @IsString()
    @MinLength(4)
    @ApiProperty()
    password: string;
  }
  
  export class LoginBody {
    @ApiProperty()
    user: LoginDTO;
  }
  
  export class RegisterDTO extends LoginDTO {
    
    _id:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    username: string;
  }
  
  export class RegisterBody {
    @ApiProperty()
    user: RegisterDTO;
  }
  
  export interface AuthPayload {
    username: string;
  }
  
  export interface UserResponse {
    email: string;
    username?: string;
  }
  
  export interface AuthResponse extends UserResponse {
    email: string;
    username?: string;
    token: string;
  }
  
