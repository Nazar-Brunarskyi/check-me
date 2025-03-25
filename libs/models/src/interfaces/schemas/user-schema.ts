import { ITelegramInfo } from './telegram-info';

export interface IUserSchema {
  _id: string;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  telegramInfo: ITelegramInfo | null;
  createdAt: Date;
  updatedAt: Date;
}
