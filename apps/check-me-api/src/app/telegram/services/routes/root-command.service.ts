import { ITelegramUpdate } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { TelegramCommand } from '../../decorators/telegram-command.decorator';
import { TelegramCommandGroup } from '../../decorators/telegram-group-command.decorator';
import { TelegramCommunicationService } from '../telegram-communication.service';
import {getChatId} from '@check-me/utils/telegram/get-chat-id';

@Injectable()
@TelegramCommandGroup()
export class RootCommandService {
  constructor(private readonly telegramCommunicationService: TelegramCommunicationService) {}

  @TelegramCommand('/start')
  async start(data: ITelegramUpdate): Promise<void> {
    return this.telegramCommunicationService.sendMessage({
      chat_id: getChatId(data),
      text: 'Hello, I am a Check-me bot. Welcome to the app!',
    });
  }
}
