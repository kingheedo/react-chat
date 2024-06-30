import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

interface IPayload {
  email: string;
  id: number;
  iat: number; //access token생성날짜
  exp: number; //access token만료날짜
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  /** jwt전략을 거쳐서 validate가 실행 */
  async validate(req: Request, payload: IPayload) {
    if (payload.email && payload.id)
      return {
        id: payload.id,
        email: payload.email,
      };
  }
}
