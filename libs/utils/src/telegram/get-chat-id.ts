import { ITelegramUpdate } from '@check-me/models';

export const getChatId = (data: ITelegramUpdate): number | undefined => {
  return data.message?.chat?.id ?? data.callback_query?.message?.chat.id;
}