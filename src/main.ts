import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import * as Bluebird from 'bluebird';

import { AppModule } from './AppModule';
import { configureAppMiddleware } from './configureMiddleware';

// @ts-ignore
global.Promise = Bluebird;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  configureAppMiddleware(app, app.get(ConfigService));
  const server = await app.listen(configService.get<string>('PORT'));
  app.get(Logger).log(`Server is running at http://localhost:${configService.get<string>('PORT')} 🚀`, 'NestApplication');
}
bootstrap();
