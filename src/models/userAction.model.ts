import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class userActionDTO{
    @ApiProperty()
    @IsString()
    @MinLength(1, {
        message: 'action Type is too short',
      })
    actionType:string;

    @ApiProperty()
    @IsString()
    @MinLength(1, {
        message: 'action Type is too short',
      })
    roomName:string;

    @ApiProperty()
    @IsString()
    userName:string;
}

export class userActionResponse{
    actiontype:actionType;
    rommName:string;
    userName:string;
}

export enum actionType{
    connected="connected",
    disconnected="disconnected"
}