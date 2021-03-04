import { ApiProperty } from "@nestjs/swagger";
import {  MinLength, IsString,  } from "class-validator";

import { UserDTO } from "./user.model";



  export class messageDTO {
    
    @ApiProperty()
    @IsString()
    @MinLength(1, {
        message: 'message is too short',
      })
     messageText: string;

     //@ApiProperty()
     //@IsString()
     userName?:string;

     user:UserDTO;
  }


  export interface messageResponse{
    messageText:string;
    userName:string;
  }