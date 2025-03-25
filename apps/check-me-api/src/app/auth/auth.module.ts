import { AuthCodeSchemaDefinition, UserSchemaDefinition } from '@check-me/database';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TelegramCommunicationService } from '../telegram/services/telegram-communication.service';
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
    MongooseModule.forFeature([
      { name: AuthCodeSchemaDefinition.name, schema: AuthCodeSchemaDefinition.schema },
      { name: UserSchemaDefinition.name, schema: UserSchemaDefinition.schema },
    ]),
  ],
  providers: [AuthService, JwtAuthGuard, JwtRefreshGuard, TelegramCommunicationService],
  controllers: [AuthController],
})
export class AuthModule {}
