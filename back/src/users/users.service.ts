import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser() {
    return 'getUser';
  }
  postUsers(email: string, nickname: string, password: string) {
    return {
      email,
      nickname,
      password,
    };
  }
}
