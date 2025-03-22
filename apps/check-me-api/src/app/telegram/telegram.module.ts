import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { TelegramController } from './controllers/telegram.controller';
import { TelegramBotService } from './services/routes/telegram-bot.service';
import { TelegramService } from './services/telegram.service';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService, DiscoveryService, TelegramBotService],
})
export class TelegramModule {}
