import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  AsyncMicroserviceOptions,
  RmqOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    AppModule,
    {
      useFactory: (c: ConfigService): RmqOptions => ({
        transport: Transport.RMQ,
        options: {
          urls: [c.getOrThrow<string>('RMQ_URL')],
          queue: 'AUTH_QUEUE',
          queueOptions: { durable: true },
        },
      }),
      inject: [ConfigService],
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new RpcException({
          status: 400,
          message: errors.flatMap((e) => Object.values(e.constraints || {})),
        }),
    }),
  );
  await app.listen();
}
void bootstrap();
