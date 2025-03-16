import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfiguration } from '../common/environment/configuration';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    UsersModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
