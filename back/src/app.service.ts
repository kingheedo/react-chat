import { UsersService } from './users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  getHello(): string {
    return 'hello';
    // return this.usersService.getUser();
    //process.env.COOKIE_SECRET
  }
}
