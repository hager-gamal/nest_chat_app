import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';


import { AuthPayload } from '../models/user.model';
import { AppConfigService } from '../config/configuration.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    configService: AppConfigService
  ) {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      //secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.secret,
      signOptions: { expiresIn: '86400s' }
    });
    
  }
  
  async validate(payload: AuthPayload) {
    const { username } = payload;
    const user = this.userRepo.find({ where: { _id:username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}