import { ISendMessageParams } from '@check-me/models';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TelegramCommunicationService {
  private readonly logger = new Logger(TelegramCommunicationService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  constructor(private readonly httpService: HttpService) {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }
  }

  async sendMessage(body: ISendMessageParams): Promise<void> {
    try {
      await lastValueFrom(this.httpService.post(`${this.apiUrl}/sendMessage`, body));
      this.logger.log(`Message sent to chat ${body.chat_id}`);
    } catch (error) {
      this.logger.error(`Failed to send message to chat ${body.chat_id}: ${error.message}`, error.stack);
    }
  }
}
