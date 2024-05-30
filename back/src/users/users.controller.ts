import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../../src/common/dto/user.dto';
import { User } from '../../src/common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from '../../src/common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from '../../src/auth/local-auth-guard';
import { AuthService } from '../../src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Users } from '@entities/Users';
import { JwtRefreshTokenGuard } from 'src/auth/jwt.refresh.token.guard';
// import { LoggedInGuard } from 'src/auth/logged-in-guard';
// import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('User')
@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findUser(@User() user: Users) {
    return this.usersService.findUser(user.email);
  }

  @ApiOperation({ summary: '회원가입' })
  // @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() body: JoinRequestDto) {
    await this.usersService.join(body.email, body.nickname, body.password);
  }

  @ApiOkResponse({
    description: '로그인 성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  // @UseGuards(NotLoggedInGuard)
  @Post('login')
  async logIn(@User() user: Pick<Users, 'id' | 'email'>) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: '로그아웃' })
  // @UseGuards(LoggedInGuard)
  @Post('logout')
  logOut() {}

  @ApiOperation({ summary: '토큰 리프레쉬' })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refreshToken')
  async refreshToken(@Body() body) {
    return await this.authService.refreshAccessToken(body);
  }
}
