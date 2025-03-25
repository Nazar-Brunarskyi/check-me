import { IRefreshTokenPayload } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshGuard extends PassportStrategy(Strategy, 'jwt-refresh') {
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
