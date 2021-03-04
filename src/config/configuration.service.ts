import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  get secret(): string {
    return this.configService.get<string>('secretConfig.secret');
  }

  get databaseHost(): string {
    return this.configService.get<string>('database.host');
  }

  get databasePort(): string {
    return this.configService.get<string>('database.port');
  }

  get databaseName(): string {
    return this.configService.get<string>('database.databaseName');
  }
  
  get port(): number {
   return Number(this.configService.get<number>('port'));
  }
}