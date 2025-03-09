import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return { status: 'OK', message: 'Check Me API' };
  }

  @Get('health')
  health() {
    return 'OK';
  }
}
