import { AuthCodeSchemaDefinition, UserSchemaDefinition } from '@check-me/database';
import {
  IAccessTokenPayload,
  IAuthCodeSchema,
  ILoginResponseDTO,
  IRefreshTokenPayload,
  ISuccessfulResponseDto,
  IUserSchema,
} from '@check-me/models';
import { generateSixDigitCode } from '@check-me/utils/auth/generate-six-digit-code';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import { Model, Types } from 'mongoose';
import { SuccessfulResponseDto } from '../../../common/DTOs/successful-response.dto';
import { TelegramCommunicationService } from '../../telegram/services/telegram-communication.service';
import { LoginResponseDTO } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login.dto';
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

  async sendCodeToTelegram(sendCodeToTelegramDto: SendCodeToTelegramDto): Promise<ISuccessfulResponseDto> {
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

  async login(loginDto: LoginDto): Promise<ILoginResponseDTO> {
    const { code, authCodeId } = loginDto;

    if (!Types.ObjectId.isValid(authCodeId)) {
      throw new BadRequestException('Invalid authCodeId format.');
    }

    const authCode = await this.authCodeModel.findById(authCodeId).populate('user').exec();
    console.log({ authCode });

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

    const { accessToken, refreshToken } = this.#generateTokens(authCode.user);

    return new LoginResponseDTO({ accessToken, refreshToken });
  }

  async validateUser() {
    return;
  }

  async register() {
    return;
  }

  async refresh() {
    return;
  }

  #generateTokens(user: IUserSchema) {
    const accessTokenPayload: IAccessTokenPayload = {
      sub: user._id,
      firstName: user.firstName,
    };

    const refreshTokenPayload: IRefreshTokenPayload = {
      sub: user._id,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '15m',
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    return { accessToken, refreshToken };
  }
}
