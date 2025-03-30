import { Injectable } from '@angular/core';
import { ISendCodeToTelegramDto, ISendCodeToTelegramResponseDTO } from '@check-me/models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TelegramLoginService extends BaseHttpService {
  sendCodeToTelegram(body: ISendCodeToTelegramDto) {
    return this.post<ISendCodeToTelegramResponseDTO>('auth/send-code-to-telegram', body);
  }
}
