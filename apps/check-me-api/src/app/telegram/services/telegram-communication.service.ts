import { ISendMessageParams } from '@check-me/models';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramCommunicationService {
  private readonly logger = new Logger(TelegramCommunicationService.name);
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  constructor() {
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }
  }

  async sendMessage(body: ISendMessageParams): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/sendMessage`, body);
    } catch (error) {
      this.logger.error(`Failed to send message to chat ${body.chat_id}: ${error.message}`, error.stack);
    }
  }
}
