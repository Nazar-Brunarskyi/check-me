import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  sendCodeToTelegram(sendCodeToTelegramDto: SendCodeToTelegramDto) {
    return { message: 'Code sent' };
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
