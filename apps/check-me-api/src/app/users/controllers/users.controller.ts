import { IJwtTokenPayload } from '@check-me/models';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUserFromRequest } from '../../../common/decorators/get-user-from-request.decorator';
import { JwtAccessGuard } from '../../auth/guards/jwt-access-guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAccessGuard)
  getMe(@GetUserFromRequest() userPayload: IJwtTokenPayload) {
    return this.usersService.getMe(userPayload.sub);
  }
}
