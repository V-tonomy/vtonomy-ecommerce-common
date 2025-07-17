import {
    CanActivate,
    ExecutionContext,
    Inject,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CLIENTS } from 'src/constant';

export class JwtGuard implements CanActivate {
  constructor(
    @Inject(CLIENTS.Auth_Client) private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const res = await firstValueFrom(
        this.authClient.send('auth.verify-token', { token }),
      );

      if (res.success) {
        req.user = res.data;
        return true;
      } else {
        throw new UnauthorizedException(res.message || 'Invalid token');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Unauthorized');
    }
  }
}
