import { SetMetadata } from '@nestjs/common';

export const TELEGRAM_COMMAND = 'TELEGRAM_COMMAND';

export const TelegramCommand = (command: string): MethodDecorator => SetMetadata(TELEGRAM_COMMAND, command);
