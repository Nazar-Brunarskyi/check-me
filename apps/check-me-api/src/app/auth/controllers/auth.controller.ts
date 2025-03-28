import {
  IJwtTokenPayload,
  ILoginResponseDTO,
  IRefreshResponseDTO,
  ISendCodeToTelegramResponseDTO,
} from '@check-me/models';
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { GetUserFromRequest } from '../../../common/decorators/get-user-from-request.decorator';
import { LoginDto } from '../dto/login.dto';
import { SendCodeToTelegramDto } from '../dto/send-code-to-telegram.dto';
import { JwtAccessGuard } from '../guards/jwt-access-guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh-guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @UseGuards(JwtAccessGuard)
  test(@GetUserFromRequest() user: IJwtTokenPayload) {
    return user;
  }

  @Post('send-code-to-telegram')
  sendCodeToTelegram(@Body() sendCodeToTelegramDto: SendCodeToTelegramDto): Promise<ISendCodeToTelegramResponseDTO> {
    return this.authService.sendCodeToTelegram(sendCodeToTelegramDto);
  }

  @Post('login-with-code')
  @HttpCode(200)
  loginWithCode(@Body() loginDto: LoginDto): Promise<ILoginResponseDTO> {
    return this.authService.loginWithCode(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  refresh(@GetUserFromRequest() user: IJwtTokenPayload): Promise<IRefreshResponseDTO> {
    return this.authService.refresh(user.sub);
  }
}
