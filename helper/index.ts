import {
    Observable,
    catchError,
    firstValueFrom,
    retry,
    throwError,
    timeout,
} from 'rxjs';

export async function sendWithTimeout<T>(
  observable$: Observable<T>,
  ms = 3000,
  retryTimes = 0,
): Promise<T> {
  return await firstValueFrom(
    observable$.pipe(
      timeout(ms),
      retry(retryTimes),
      catchError((err) => {
        console.error('[Microservice Error]', err.message);
        return throwError(() => err);
      }),
    ),
  );
}
