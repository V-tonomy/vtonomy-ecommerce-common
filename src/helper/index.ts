import {
  GatewayTimeoutException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { Observable, firstValueFrom, retry, timeout } from 'rxjs';

export async function sendWithTimeout<T>(
  observable$: Observable<T>,
  ms = 3000,
  retryTimes = 0,
): Promise<T> {
  try {
    return await firstValueFrom(
      observable$.pipe(timeout(ms), retry(retryTimes)),
    );
  } catch (err: any) {
    if (err.name === 'TimeoutError') {
      throw new GatewayTimeoutException('Microservice timed out');
    }

    if (err.message?.includes('ECONNREFUSED')) {
      throw new ServiceUnavailableException('Microservice is offline');
    }

    throw new InternalServerErrorException(
      'Something went wrong with user service',
    );
  }
}

export const createClient = (
  name: string,
  queue: string,
  queueOptions: Record<string, any> = {},
): ClientProviderOptions => ({
  name,
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
    queue,
    queueOptions,
  },
});