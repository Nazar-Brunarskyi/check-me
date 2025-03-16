import { UserSchemaDefinition } from '@check-me/database';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: UserSchemaDefinition.name, schema: UserSchemaDefinition.schema }])],
})
export class UsersModule {}
