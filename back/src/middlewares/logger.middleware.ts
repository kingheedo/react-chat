import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
//실무에서는 nest 모건 패키지 사용하기

@Injectable()
//implements는 반드시 구현해야하는 강제사항이 생긴다
export class LoggerMiddleWare implements NestMiddleware {
  private logger = new Logger('HTTP'); //context를 넣는 이유는 로그 찍히는걸 쉽게 구분하기 위해 http 요청앞에 'HTTP'가 붙는다.

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent' || '');

    response.on('finish', () => {
      //라우터 끝날 때 실행
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      //nest는 console.log 대신 Logger.log를 많이 쓴다.
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
