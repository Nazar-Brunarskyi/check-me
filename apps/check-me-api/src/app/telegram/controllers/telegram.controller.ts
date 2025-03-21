import { ITelegramUpdate } from '@check-me/models';
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { TelegramService } from '../services/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  handleWebhook(@Body() data: ITelegramUpdate, @Headers() headers: any) {
    console.log(headers);

    return this.telegramService.handleWebhook(data);
  }
}
