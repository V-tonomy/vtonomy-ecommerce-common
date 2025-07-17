// jwt.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS } from 'src/constant';
import { JwtGuard } from './jwt.guard';

interface JwtModuleOptions {
  isGlobal?: boolean;
}

@Module({})
export class JwtModule {
  static register(options: JwtModuleOptions = {}): DynamicModule {
    return {
      module: JwtModule,
      imports: [
        ClientsModule.register([
          {
            name: CLIENTS.Auth_Client,
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
              queue: 'auth_queue',
            },
          },
        ]),
      ],
      providers: options.isGlobal
        ? [
            {
              provide: APP_GUARD,
              useClass: JwtGuard,
            },
          ]
        : [],
      exports: [],
    };
  }
}
