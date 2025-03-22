import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TelegramRequestGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    return headers[process.env.TELEGRAM_BOT_API_SECRET_TOKEN_HEADER_NAME] === process.env.TELEGRAM_BOT_API_SECRET_TOKEN;
  }
}
