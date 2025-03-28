import { UserSchemaDefinition } from '@check-me/database';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchemaDefinition.name, schema: UserSchemaDefinition.schema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
