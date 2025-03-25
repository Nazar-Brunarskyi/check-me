import { IJwtTokenPayload, JWT_STRATEGY_NAMES_ENUM } from '@check-me/models';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAMES_ENUM.JWT_ACCESS) {
  private readonly logger = new Logger(JwtAccessStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IJwtTokenPayload) {
    const { sub } = payload;

    if (!Types.ObjectId.isValid(sub)) {
      this.logger.error('Invalid user id in JwtAccessStrategy');
      throw new UnauthorizedException('Unauthorized');
    }

    return payload;
  }
}
