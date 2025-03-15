import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfiguration } from '../common/environment/configuration';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
