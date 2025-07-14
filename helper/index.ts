import { GatewayTimeoutException, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import {
  Observable,
  firstValueFrom,
  retry,
  timeout
} from 'rxjs';

export async function sendWithTimeout<T>(
  observable$: Observable<T>,
  ms = 3000,
  retryTimes = 0,
): Promise<T> {
  try {
    return await firstValueFrom(
      observable$.pipe(
        timeout(ms),
        retry(retryTimes)
      )
    );
  } catch (err: any) {
    if (err.name === 'TimeoutError') {
      throw new GatewayTimeoutException('Microservice timed out');
    }
  
    if (err.message?.includes('ECONNREFUSED')) {
      throw new ServiceUnavailableException('Microservice is offline');
    }
  
    throw new InternalServerErrorException('Something went wrong with user service');
  }
}
