//import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { AppConfigService } from './config/configuration.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get('AppConfigService');

  const options = new DocumentBuilder()
    .setTitle('Conduit Blog API')
    .setDescription('Conduit blog api')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port); 
}
bootstrap();
