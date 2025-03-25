import { AuthCodeSchemaDefinition, UserSchemaDefinition } from '@check-me/database';
import { IAuthCodeSchema, IUserSchema } from '@check-me/models';
import { generateSixDigitCode } from '@check-me/utils/auth/generate-six-digit-code';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { Model, Types } from 'mongoose';
import { SuccessfulResponseDto } from '../../../common/DTOs/successful-response.dto';
import { TelegramCommunicationService } from '../../telegram/services/telegram-communication.service';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    @InjectModel(AuthCodeSchemaDefinition.name)
    private authCodeModel: Model<IAuthCodeSchema>,
    @InjectModel(UserSchemaDefinition.name)
    private userModel: Model<IUserSchema>,
    private readonly telegramCommunicationService: TelegramCommunicationService,
  ) {}

  async sendCodeToTelegram(sendCodeToTelegramDto: SendCodeToTelegramDto) {
    const { phoneNumber } = sendCodeToTelegramDto;
    const normalizedPhoneNumber = phoneNumber.split('+')[1];
    const code = generateSixDigitCode();
    const expiredAt = DateTime.now().plus({ minutes: 5 });

    const user = await this.userModel.findOne({ phoneNumber: normalizedPhoneNumber });

    if (!user) {
      throw new BadRequestException('Invalid request');
    }

    const salt = await bcrypt.genSalt();
    const encryptedCode = await bcrypt.hash(`${code}`, salt);

    const newAuthCode = new this.authCodeModel({
      code: encryptedCode,
      phoneNumber: normalizedPhoneNumber,
      user: new Types.ObjectId(user._id),
      expiredAt: expiredAt.toJSDate(),
    });

    await newAuthCode.save();

    await this.telegramCommunicationService.sendMessage({
      chat_id: user.telegramInfo.chat_id,
      parse_mode: 'HTML',
      text: `Your code is: <b>${code}</b>`,
    });

    return new SuccessfulResponseDto({ success: true });
  }

  async validateUser() {
    return;
  }

  async login() {
    return;
  }

  async register() {
    return;
  }

  async refresh() {
    return;
  }
}
