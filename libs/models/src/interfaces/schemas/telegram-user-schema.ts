export interface ITelegramUserSchema {
  _id: string;
  userId: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}
