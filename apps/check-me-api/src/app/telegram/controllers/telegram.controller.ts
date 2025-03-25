import { ITelegramUpdate } from '@check-me/models';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TelegramRequestGuard } from '../guards/telegram-request-guard';
import { TelegramService } from '../services/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @UseGuards(TelegramRequestGuard)
  @Post('webhook')
  handleWebhook(@Body() data: ITelegramUpdate) {
    console.log(data);

    return this.telegramService.handleWebhook(data);
  }
}
