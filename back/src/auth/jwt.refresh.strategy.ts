import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

type RequestBody = ReadableStream<Uint8Array> & { refreshToken: string };

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request.body) {
            if ((request.body as RequestBody).refreshToken) {
              return `${(request.body as RequestBody).refreshToken}`;
            }
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (payload.email && payload.id)
      return {
        id: payload.id,
        email: payload.email,
      };
  }
}
