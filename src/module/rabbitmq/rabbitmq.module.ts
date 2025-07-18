import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENTS } from 'src/constant';
import { createClient } from 'src/helper';

export const QueueConfig = {
  User_Client: {
    durable: true,
    arguments: {
      'x-message-ttl': 10000,
      'x-dead-letter-exchange': 'dlx',
    },
  },
  Auth_Client: { durable: true },
  Notification_Client: { durable: true },
  Search_Client: { durable: true },
  Mail_Client: { durable: true },
  Cart_Client: { durable: true },
};

const clientProviders = ClientsModule.register([
  createClient(CLIENTS.User_Client, 'user_queue', QueueConfig.User_Client),
  createClient(CLIENTS.Auth_Client, 'auth_queue', QueueConfig.Auth_Client),
  createClient(
    CLIENTS.Notification_Client,
    'notification_queue',
    QueueConfig.Notification_Client,
  ),
  createClient(
    CLIENTS.Search_Client,
    'search_queue',
    QueueConfig.Search_Client,
  ),
  createClient(CLIENTS.Mail_Client, 'mail_queue', QueueConfig.Mail_Client),
]);

@Module({
  imports: [clientProviders],
  providers: [],
  exports: [clientProviders],
})
export class RabbitmqModule {}
