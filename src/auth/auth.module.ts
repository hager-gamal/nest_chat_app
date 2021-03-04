import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AppConfigModule } from '../config/configuration.module';
import { AppConfigService } from '../config/configuration.service';
import { UserEntity } from '../entities/user.entity';


@Module({
  providers: [AuthService, JwtStrategy,AppConfigService],
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([UserEntity]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
   
    JwtModule.registerAsync({
      imports: [ AppConfigModule],
      useFactory: async (configService: AppConfigService) => {
        return {
          secret: configService.secret
        };
      },
      inject: [AppConfigService]
    }),
    /*
    JwtModule.register({
      //imports: [ConfigModule],
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      }
    })
    */
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy,AppConfigModule],
})
export class AuthModule {}
