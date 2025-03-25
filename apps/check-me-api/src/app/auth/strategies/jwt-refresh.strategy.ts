import { IRefreshTokenPayload, JWT_STRATEGY_NAMES_ENUM } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAMES_ENUM.JWT_REFRESH) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      // passReqToCallback: true,
    });
  }

  async validate(payload: IRefreshTokenPayload) {
    return payload;
  }
}
