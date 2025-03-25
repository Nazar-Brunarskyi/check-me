import { ITelegramInfo } from './telegram-info';

export interface IUserSchema {
  _id: string;
  firstName: string;
  lastName?: string;
  telegramInfo: ITelegramInfo | null;
}
