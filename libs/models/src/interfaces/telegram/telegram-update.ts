import { ITelegramUser } from "./telegram-user";

export interface ITelegramUpdate {
  update_id: number;
  message?: ITelegramMessage;
  edited_message?: ITelegramMessage;
  channel_post?: ITelegramMessage;
  edited_channel_post?: ITelegramMessage;
  inline_query?: ITelegramInlineQuery;
  chosen_inline_result?: ITelegramChosenInlineResult;
  callback_query?: ITelegramCallbackQuery;
  shipping_query?: ITelegramShippingQuery;
  pre_checkout_query?: ITelegramPreCheckoutQuery;
}

interface ITelegramMessage {
  message_id: number;
  from: ITelegramUser;
  date: number; // Timestamp
  chat: ITelegramChat;
  forward_from?: ITelegramUser;
  forward_from_chat?: ITelegramChat;
  forward_date?: number; // Timestamp
  reply_to_message?: ITelegramMessage;
  text?: string;
  entities?: ITelegramMessageEntity[];
  caption?: string;
  audio?: ITelegramAudio;
  document?: ITelegramDocument;
  photo?: ITelegramPhotoSize[];
  sticker?: ITelegramSticker;
  video?: ITelegramVideo;
  voice?: ITelegramVoice;
  video_note?: ITelegramVideoNote;
  location?: ITelegramLocation;
  contact?: ITelegramContact;
  dice?: ITelegramDice;
  game?: ITelegramGame;
  poll?: ITelegramPoll;
  venue?: ITelegramVenue;
  new_chat_members?: ITelegramUser[];
  left_chat_member?: ITelegramUser;
  new_chat_title?: string;
  new_chat_photo?: ITelegramPhotoSize[];
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: ITelegramMessage;
}

interface ITelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  all_members_are_administrators?: boolean;
}

interface ITelegramMessageEntity {
  type:
    | 'mention'
    | 'hashtag'
    | 'bot_command'
    | 'url'
    | 'email'
    | 'phone_number'
    | 'bold'
    | 'italic'
    | 'code'
    | 'pre'
    | 'text_link'
    | 'text_mention';
  offset: number;
  length: number;
  url?: string;
  user?: ITelegramUser;
}

interface ITelegramInlineQuery {
  id: string;
  from: ITelegramUser;
  query: string;
  offset: string;
}

interface ITelegramChosenInlineResult {
  result_id: string;
  from: ITelegramUser;
  query: string;
}

interface ITelegramCallbackQuery {
  id: string;
  from: ITelegramUser;
  message?: ITelegramMessage;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
}

interface ITelegramShippingQuery {
  id: string;
  from: ITelegramUser;
  invoice_payload: string;
  shipping_address: ITelegramShippingAddress;
}

interface ITelegramShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2?: string;
  post_code: string;
}

interface ITelegramPreCheckoutQuery {
  id: string;
  from: ITelegramUser;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: ITelegramOrderInfo;
}

interface ITelegramOrderInfo {
  name: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ITelegramShippingAddress;
}

interface ITelegramAudio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  mime_type?: string;
  file_size?: number;
}

interface ITelegramDocument {
  file_id: string;
  file_unique_id: string;
  thumb?: ITelegramPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface ITelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface ITelegramSticker {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  thumb?: ITelegramPhotoSize;
  emoji?: string;
  file_size?: number;
}

interface ITelegramVideo {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: ITelegramPhotoSize;
  mime_type?: string;
  file_size?: number;
}

interface ITelegramVoice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

interface ITelegramVideoNote {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumb?: ITelegramPhotoSize;
  file_size?: number;
}

interface ITelegramLocation {
  longitude: number;
  latitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

interface ITelegramContact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
}

interface ITelegramDice {
  emoji: string;
  value: number;
}

interface ITelegramGame {
  title: string;
  description: string;
  photo: ITelegramPhotoSize[];
  text?: string;
  text_entities?: ITelegramMessageEntity[];
  animation?: ITelegramAnimation;
}

interface ITelegramAnimation {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: ITelegramPhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface ITelegramPoll {
  id: string;
  question: string;
  options: ITelegramPollOption[];
  is_closed: boolean;
  is_anonymous: boolean;
  type: 'regular' | 'quiz';
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: ITelegramMessageEntity[];
  open_period?: number;
  close_date?: number;
}

interface ITelegramPollOption {
  text: string;
  voter_count: number;
  is_correct_answer: boolean;
  option_id: number;
}

interface ITelegramVenue {
  location: ITelegramLocation;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
}

interface ITelegramShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2?: string;
  post_code: string;
}
