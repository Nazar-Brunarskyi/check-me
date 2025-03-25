import { Body, Controller, Post } from '@nestjs/common';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('send-code-to-telegram')
  sendCodeToTelegram(@Body() sendCodeToTelegramDto: SendCodeToTelegramDto) {
    return this.authService.sendCodeToTelegram(sendCodeToTelegramDto);
  }
}
