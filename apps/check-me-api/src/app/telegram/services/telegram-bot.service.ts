import { ITelegramUpdate } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { TelegramCommand } from '../decorators/telegram-command.decorator';
import { TelegramCommandGroup } from '../decorators/telegram-group-command.decorator';

@Injectable()
@TelegramCommandGroup('/bot')
export class TelegramBotService {
  @TelegramCommand('/start')
  async startCommand(update: ITelegramUpdate) {
    console.log('Start command executed', update);
  }
}
