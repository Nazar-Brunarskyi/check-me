import { ILoginResponseDTO, ISuccessfulResponseDto } from '@check-me/models';
import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';
import { AuthService } from '../services/auth.service';
import { JwtRefreshGuard } from '../strategies/jwt-refresh.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('send-code-to-telegram')
  sendCodeToTelegram(@Body() sendCodeToTelegramDto: SendCodeToTelegramDto): Promise<ISuccessfulResponseDto> {
    return this.authService.sendCodeToTelegram(sendCodeToTelegramDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto): Promise<ILoginResponseDTO> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Request() req): number {
    return 123
  }
}
