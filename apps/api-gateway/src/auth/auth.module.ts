import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

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
    PassportModule,
  ],
  providers: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
