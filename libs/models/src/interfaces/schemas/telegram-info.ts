export interface ITelegramInfo {
  _id: string;
  telegramUserId: number;
  is_bot: boolean;
  username?: string;
  language_code?: string;
  phone_number?: string;
}
