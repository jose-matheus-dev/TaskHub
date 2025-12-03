import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (c: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: c.getOrThrow('PG_HOST'),
        port: +c.getOrThrow('PG_PORT'),
        username: c.getOrThrow('PG_USER'),
        password: c.getOrThrow('PG_PASSWORD'),
        database: c.getOrThrow('PG_DB'),
        synchronize: true,
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        entities: ['dist/**/*.entity.js'],
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
