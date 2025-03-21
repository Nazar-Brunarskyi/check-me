import { ITelegramUpdate } from '@check-me/models';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TelegramService {
  async handleWebhook(data: ITelegramUpdate): Promise<void> {
    return;
  }
}
