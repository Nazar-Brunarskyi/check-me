import { Injectable } from '@nestjs/common';
import { TelegramCommand } from '../../decorators/telegram-command.decorator';
import { TelegramCommandGroup } from '../../decorators/telegram-group-command.decorator';
import { TelegramCommunicationService } from '../telegram-communication.service';
import { ITelegramUpdate } from '@check-me/models';

@Injectable()
@TelegramCommandGroup('/root')
export class RootCommandService {
  constructor(private readonly telegramCommunicationService: TelegramCommunicationService) {}

  @TelegramCommand('/start')
  async start(data: ITelegramUpdate): Promise<void> {
    return this.telegramCommunicationService.sendMessage({
      chat_id: data.message.chat.id,
      text: 'Hello, I am a Check-me bot. Welcome to the app!',
    })
  }
}
