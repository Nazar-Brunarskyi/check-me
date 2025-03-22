import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { TelegramController } from './controllers/telegram.controller';
import { RootCommandService } from './services/routes/root-command.service';
import { TelegramCommunicationService } from './services/telegram-communication.service';
import { TelegramService } from './services/telegram.service';

@Module({
  imports: [HttpModule],
  controllers: [TelegramController],
  providers: [TelegramService, DiscoveryService, TelegramCommunicationService, RootCommandService],
})
export class TelegramModule {}
