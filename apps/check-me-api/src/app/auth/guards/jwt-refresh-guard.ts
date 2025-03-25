import { JWT_STRATEGY_NAMES_ENUM } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_STRATEGY_NAMES_ENUM.JWT_REFRESH) {}