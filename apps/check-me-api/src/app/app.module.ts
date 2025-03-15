import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfiguration } from '../common/environment/configuration';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
