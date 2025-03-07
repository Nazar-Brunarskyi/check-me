import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log(123);

    return { message: 'Hello API' };
  }
}
