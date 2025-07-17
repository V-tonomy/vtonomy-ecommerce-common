// jwt.module.ts
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS } from 'src/constant';
import { JwtGuard } from './jwt.guard';

@Global()
@Module({
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
  providers: [JwtGuard],
  exports: [JwtGuard, ClientsModule],
})
export class JwtModule {}
