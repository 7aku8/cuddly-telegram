import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { middleware as expressCtx } from 'express-ctx';
import { Logger, ValidationPipe } from '@nestjs/common';
import classValidator from 'class-validator';
import classTransformer from 'class-transformer';
import { ConfigService } from '@shared/config.service';
import { SharedModule } from '@modules/shared/shared.module';

const logger = new Logger('GYM TRACKER API');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.use(helmet({ noSniff: true }));
  app.use(compression());
  app.use(morgan('dev'));
  app.use(expressCtx);

  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: classValidator,
      transformerPackage: classTransformer,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.select(SharedModule).get(ConfigService);

  await app.listen(configService.appConfig.port, configService.appConfig.host);

  return { port: configService.appConfig.port };
}
bootstrap().then(({ port }) =>
  logger.debug(`🚀 Application running on port: ${port} 🚀`),
);
