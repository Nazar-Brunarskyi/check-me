import { IJwtTokenPayload, JWT_STRATEGY_NAMES_ENUM } from '@check-me/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAMES_ENUM.JWT_ACCESS) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IJwtTokenPayload) {
    const { sub } = payload;

    if (!Types.ObjectId.isValid(sub)) {
      throw new UnauthorizedException('Unauthorized');
    }

    return payload;
  }
}
