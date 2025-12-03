import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (c: ConfigService): RmqOptions => ({
          transport: Transport.RMQ,
          options: {
            urls: [c.getOrThrow<string>('RMQ_URL')],
            queue: 'AUTH_QUEUE',
            queueOptions: { durable: true },
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
