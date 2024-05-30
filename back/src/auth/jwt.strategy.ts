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

  async validate(req: Request, payload: IPayload) {
    // 2
    //req.user로 들어갈 값이 결정되는 구간
    // if (Date.now() < payload.exp * 1000) {
    if (payload.id && payload.email)
      return {
        id: payload.id,
        email: payload.email,
      };
    // }
  }
}
