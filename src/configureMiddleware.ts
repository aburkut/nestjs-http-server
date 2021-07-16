import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { ResponseInterceptor } from './shared/interceptor';

export const configureAppMiddleware = (app: NestExpressApplication, configService: ConfigService): void => {
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: configService.get('DETAILED_ERRORS') === 'true',
    }),
  );

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.enableCors();

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 100000, // limit each IP to X requests per windowMs
    }),
  );
  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.useGlobalInterceptors(new ResponseInterceptor());
};
