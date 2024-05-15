import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServcie: UsersService) {}
  @Get()
  getUsers() {}

  @Post()
  postUsers(@Body() data: JoinRequestDto) {}

  @Post('login')
  logIn() {}

  @Post('logout')
  logOut() {}
}
