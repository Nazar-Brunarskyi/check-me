import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.services';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
