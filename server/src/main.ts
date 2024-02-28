import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

require('dotenv').config();

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const origin: string = process.env.CORS_ORIGIN;
  const port: number = parseInt(process.env.PORT);

  app.enableCors({
    origin: origin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use(cookieParser());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // limit each IP to 300 requests
    }),
  );

  app.use(helmet());

  await app.listen(port);
  logger.log(`~~~ Server is running on ${port} ~~~`);
}

bootstrap();
