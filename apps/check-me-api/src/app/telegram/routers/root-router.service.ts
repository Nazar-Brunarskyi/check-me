import { TelegramUserSchemaDefinition } from '@check-me/database';
import { ITelegramUpdate, ITelegramUserSchema } from '@check-me/models';
import { getChatId } from '@check-me/utils/telegram/get-chat-id';
import { getTelegramUser } from '@check-me/utils/telegram/get-telegram-user';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TelegramCommand } from '../decorators/telegram-command.decorator';
import { TelegramCommandGroup } from '../decorators/telegram-group-command.decorator';
import { TelegramCommunicationService } from '../services/telegram-communication.service';

@Injectable()
@TelegramCommandGroup()
export class RootCommandService {
  private readonly logger = new Logger(RootCommandService.name);

  constructor(
    @InjectModel(TelegramUserSchemaDefinition.name)
    private telegramUserModel: Model<ITelegramUserSchema>,
    private readonly telegramCommunicationService: TelegramCommunicationService,
  ) {}

  @TelegramCommand('/start')
  async start(data: ITelegramUpdate): Promise<void> {
    const telegramUser = await this.#getOrCreateTelegramUser(data);
    const messageTexts = this.#generateMesaageText(telegramUser);

    return this.telegramCommunicationService.sendMessage({
      chat_id: getChatId(data),
      text: messageTexts.textToSend,
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [[{ text: messageTexts.buttonText, request_contact: true }], [{ text: 'Menu' }]],
        one_time_keyboard: true,
      },
    });
  }
  @TelegramCommand('_')
  async defaultHandler(data: ITelegramUpdate) {
    if (data.message?.contact) {
      return this.#handleContact(data);
    }

    return this.telegramCommunicationService.sendMessage({
      chat_id: getChatId(data),
      text: 'I do not understand this command',
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }

  async #getOrCreateTelegramUser(data: ITelegramUpdate) {
    const telegramUser = getTelegramUser(data);

    if (!telegramUser) {
      this.logger.error('Failed to get telegram user id');
      return;
    }

    const user = await this.telegramUserModel
      .findOneAndUpdate(
        { userId: telegramUser.id },
        {
          $setOnInsert: {
            userId: telegramUser.id,
            is_bot: telegramUser.is_bot,
            first_name: telegramUser.first_name,
            last_name: telegramUser.last_name,
            username: telegramUser.username,
            language_code: telegramUser.language_code,
          },
        },
        { new: true, upsert: true },
      )
      .exec();

    return user.toObject();
  }

  #generateMesaageText(telegramUser: ITelegramUserSchema) {
    const hasPhoneNumber = !!telegramUser.phone_number;

    const textToSend = hasPhoneNumber
      ? `Looks like you are already authenticated with this phone number: <b>${telegramUser.phone_number}</b>. Do you want to update it?`
      : "Hello there! I'm the Check-me Bot, and I'm excited to welcome you to our app. To get started, please share your phone number with me. This helps us verify your account and ensure a smooth experience.";

    const buttonText = hasPhoneNumber ? 'Update my phone number' : 'Share my phone number';
    return { textToSend, buttonText };
  }

  async #handleContact(data: ITelegramUpdate) {
    if (!data || !data.message || !data.message.contact) {
      this.logger.error('Failed to get contact from message');
      return;
    }

    const { contact } = data.message;
    const telegramUser = getTelegramUser(data);

    if (!telegramUser) {
      this.logger.error('Failed to get telegram user id');
      return;
    }

    const canYpdatePhoneNumber = contact.user_id === telegramUser.id;

    if (canYpdatePhoneNumber) {
      const updatedUser = await this.telegramUserModel
        .findOneAndUpdate({ userId: telegramUser.id }, { $set: { phone_number: contact.phone_number } }, { new: true })
        .exec();

      await this.telegramCommunicationService.sendMessage({
        chat_id: getChatId(data),
        text: `Your phone number has been set to: <b>${updatedUser.phone_number}</b>`,
        parse_mode: 'HTML',
        reply_markup: {
          remove_keyboard: true,
        },
      });
    } else {
      await this.telegramCommunicationService.sendMessage({
        chat_id: getChatId(data),
        text: 'You are not allowed to use to this phone number',
        reply_markup: {
          remove_keyboard: true,
        },
      });
    }
  }
}
