import { ITelegramUser } from './telegram-user';

export interface ISendMessageParams {
  chat_id: number | string;
  text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: MessageEntity[];
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
  message_thread_id?: number;
}

interface MessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: ITelegramUser;
  language?: string;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  // additional optional properties can be added here
}

interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
  is_persistent?: boolean;
}

interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
}

interface KeyboardButtonPollType {
  type?: string;
}

interface ReplyKeyboardRemove {
  remove_keyboard: boolean;
  selective?: boolean;
}

interface ForceReply {
  force_reply: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}
