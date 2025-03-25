import { AuthCodeSchemaDefinition, UserSchemaDefinition } from '@check-me/database';
import {
  IAuthCodeSchema,
  IJwtTokenPayload,
  ILoginResponseDTO,
  ISendCodeToTelegramResponseDTO,
  IUserSchema,
} from '@check-me/models';
import { generateSixDigitCode } from '@check-me/utils/auth/generate-six-digit-code';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { Model, Types } from 'mongoose';
import { TelegramCommunicationService } from '../../telegram/services/telegram-communication.service';
import { LoginResponseDTO } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
import { SendCodeToTelegramResponseDTO } from '../dto/send-code-to-telegram-response.dto';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(AuthCodeSchemaDefinition.name)
    private authCodeModel: Model<IAuthCodeSchema>,
    @InjectModel(UserSchemaDefinition.name)
    private userModel: Model<IUserSchema>,
    private jwtService: JwtService,
    private readonly telegramCommunicationService: TelegramCommunicationService,
  ) {}

  async sendCodeToTelegram(sendCodeToTelegramDto: SendCodeToTelegramDto): Promise<ISendCodeToTelegramResponseDTO> {
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

    return new SendCodeToTelegramResponseDTO({ authCodeId: newAuthCode._id });
  }

  async login(loginDto: LoginDto): Promise<ILoginResponseDTO> {
    const { code, authCodeId } = loginDto;

    if (!Types.ObjectId.isValid(authCodeId)) {
      throw new BadRequestException('Invalid authCodeId format.');
    }

    const authCode = await this.authCodeModel.findById(authCodeId).populate('user').exec();

    if (!authCode) {
      throw new UnauthorizedException('Invalid authentication code.');
    }

    const now = DateTime.now();
    const expiredAt = DateTime.fromJSDate(authCode.expiredAt);

    if (expiredAt < now) {
      throw new UnauthorizedException('Invalid authentication code.');
    }

    const isCodeValid = await bcrypt.compare(code, authCode.code);

    if (!isCodeValid) {
      throw new UnauthorizedException('Invalid authentication code.');
    }

    await this.authCodeModel.findByIdAndDelete(authCodeId);

    const accessToken = this.#generateAccessToken(authCode.user);
    const refreshToken = this.#generateRefreshToken(authCode.user);

    return new LoginResponseDTO({ accessToken, refreshToken });
  }

  async refresh() {
    return;
  }

  #generateAccessToken(user: IUserSchema): string {
    return this.jwtService.sign(this.#generatePayload(user), {
      expiresIn: '15m',
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  #generateRefreshToken(user: IUserSchema): string {
    return this.jwtService.sign(this.#generatePayload(user), {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }

  #generatePayload(user: IUserSchema): IJwtTokenPayload {
    return {
      sub: user._id,
      firstName: user.firstName,
    };
  }
}
