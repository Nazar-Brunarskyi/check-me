import { UserSchemaDefinition } from '@check-me/database';
import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramController } from './controllers/telegram.controller';
import { RootCommandService } from './routers/root-router.service';
import { TelegramCommunicationService } from './services/telegram-communication.service';
import { TelegramService } from './services/telegram.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchemaDefinition.name, schema: UserSchemaDefinition.schema }])],
  controllers: [TelegramController],
  providers: [TelegramService, DiscoveryService, TelegramCommunicationService, RootCommandService],
})
export class TelegramModule {}
