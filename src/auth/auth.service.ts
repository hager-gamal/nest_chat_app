import { Injectable, 
          ConflictException, 
          InternalServerErrorException, 
          UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { RegisterDTO, AuthResponse,LoginDTO } from '../models/user.model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: JwtService,
      ) {}
    
      async register(credentials: RegisterDTO): Promise<AuthResponse> {
        try {

          credentials._id = credentials.username;
         
          const user = this.userRepo.create(credentials);
          await user.save();
          const payload = { username: user._id };
          const token = this.jwtService.sign(payload);
          return { ...user.toJSON(), token };
        } catch (err) {
          if (err.code === '23505') {
            throw new ConflictException('Username has already been taken');
          }
          throw new InternalServerErrorException(err.message);
        }
    }

    async login({ email, password }: LoginDTO): Promise<AuthResponse> {
      try {
        const user = await this.userRepo.findOne({ where: { email } });
        const isValid = await user.comparePassword(password);
        if (!isValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user._id };
        const token = this.jwtService.sign(payload);
        return { ...user.toJSON(), token };
      } catch (err) {
        throw new UnauthorizedException(err.message);
      }
    }
    
}
