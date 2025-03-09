import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get() {
    return { status: 'OK' };
  }

  @Get('health')
  health() {
    return 'OK';
  }
}
