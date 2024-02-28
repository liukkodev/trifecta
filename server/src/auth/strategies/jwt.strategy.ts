import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserPayload } from 'src/auth/types/auth.types';

// TODO: this is needed, even though it's already in main.ts
require('dotenv').config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<UserPayload> {
    return { id: payload.sub, name: payload.name };

    // Example
    // const user = await this.authService.findOne(payload.sub);
    // return {
    //     id: payload.sub,
    //     name: payload.name,
    //     ...user
    // };
    // Becomes available in the request object as req.user, e.g. in auth.controller
  }
}
