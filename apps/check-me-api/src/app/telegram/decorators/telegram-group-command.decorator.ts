import { SetMetadata } from '@nestjs/common';

export const TELEGRAM_COMMAND_GROUP = 'TELEGRAM_COMMAND_GROUP';

export const TelegramCommandGroup = (group = ''): ClassDecorator => SetMetadata(TELEGRAM_COMMAND_GROUP, group);
