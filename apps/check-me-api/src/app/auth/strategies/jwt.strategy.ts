import { IAccessTokenPayload, JWT_STRATEGY_NAMES_ENUM } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy, JWT_STRATEGY_NAMES_ENUM.JWT_ACCESS) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IAccessTokenPayload) {
    return payload;
  }
}
