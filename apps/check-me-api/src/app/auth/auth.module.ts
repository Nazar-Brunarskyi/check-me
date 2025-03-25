import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtRefreshGuard } from './strategies/jwt-refresh.strategy';
import { JwtAuthGuard } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, JwtAuthGuard, JwtRefreshGuard],
  controllers: [AuthController],
})
export class AuthModule {}
