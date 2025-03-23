import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TelegramModule } from './telegram/telegram.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegramModule,
    AuthModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
