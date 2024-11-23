import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: 'http://localhost:5173', // Vite dev server URL
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
