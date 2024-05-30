import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  // Add your custom authentication logic here
  // for example, call super.logIn(request) to establish a session.
  //   const can = await super.canActivate(context);
  //   if (can) {
  //     const request = context.switchToHttp().getRequest();
  //     console.log('login for cookie');
  //     await super.logIn(request);
  //   }
  //   return true;
  // }
}
