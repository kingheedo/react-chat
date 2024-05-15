import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  //intercept는 컨트롤러 실행 전과 후를 다룰 수 있다.
  //즉 컨트롤러에서 마지막에 리턴해주는 값을 한번 더 가공할 수 있다.
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //전 부분
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data))); //data는 컨트롤러에서 리턴해주는데이터
  }
}
