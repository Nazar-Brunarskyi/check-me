import { ITelegramUpdate, ITelegramUser } from '@check-me/models';

export const getTelegramUser = (data: ITelegramUpdate): ITelegramUser | undefined => {
  return data.message?.from ?? data.callback_query?.from;
};
