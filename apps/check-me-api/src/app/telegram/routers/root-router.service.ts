import { UserSchemaDefinition } from '@check-me/database';
import { ITelegramInfo, ITelegramUpdate, IUserSchema } from '@check-me/models';
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
    @InjectModel(UserSchemaDefinition.name)
    private userModel: Model<IUserSchema>,
    private readonly telegramCommunicationService: TelegramCommunicationService,
  ) {}

  @TelegramCommand('/start')
  async start(data: ITelegramUpdate): Promise<void> {
    const user = await this.#getOrCreateUser(data);
    const messageTexts = this.#generateMesaageText(user);

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

  async #getOrCreateUser(data: ITelegramUpdate) {
    const telegramUser = getTelegramUser(data);
    const chatId = getChatId(data);

    if (!telegramUser) {
      this.logger.error('Failed to get telegram user');
      return;
    }

    const telegramInfo: Omit<ITelegramInfo, '_id'> = {
      telegramUserId: telegramUser.id,
      is_bot: telegramUser.is_bot,
      username: telegramUser.username,
      language_code: telegramUser.language_code,
      chat_id: chatId,
    };

    const user = await this.userModel
      .findOneAndUpdate(
        { 'telegramInfo.telegramUserId': telegramUser.id },
        {
          $setOnInsert: {
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            telegramInfo: telegramInfo,
          },
        },
        { new: true, upsert: true },
      )
      .exec();

    return user.toObject();
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
      const updatedUser = await this.userModel
        .findOneAndUpdate(
          { 'telegramInfo.telegramUserId': telegramUser.id },
          { $set: { phoneNumber: contact.phone_number } },
          { new: true },
        )
        .exec();

      await this.telegramCommunicationService.sendMessage({
        chat_id: getChatId(data),
        text: `Your phone number has been set to: <b>${updatedUser.phoneNumber}</b>`,
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

  #generateMesaageText(user: IUserSchema) {
    const hasPhoneNumber = !!user.phoneNumber;

    const textToSend = hasPhoneNumber
      ? `Looks like you are already authenticated with this phone number: <b>${user.phoneNumber}</b>. Do you want to update it?`
      : "Hello there! I'm the Check-me Bot, and I'm excited to welcome you to our app. To get started, please share your phone number with me. This helps us verify your account and ensure a smooth experience.";

    const buttonText = hasPhoneNumber ? 'Update my phone number' : 'Share my phone number';
    return { textToSend, buttonText };
  }
}
