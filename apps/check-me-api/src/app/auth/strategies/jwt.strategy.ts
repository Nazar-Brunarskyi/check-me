import { IAccessTokenPayload } from '@check-me/models';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET, // Use environment variables in production
    });
  }

  async validate(payload: IAccessTokenPayload) {
    // return { sub: payload.sub, username: payload.username };
    return payload;
  }
}
