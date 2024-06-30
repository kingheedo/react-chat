import {
  Body,
  Controller,
  Get,
  Headers,
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
import { JwtAuthGuard } from '../../src/auth/jwt-auth-guard';
import { Users } from '@entities/Users';
import { JwtRefreshTokenGuard } from '../../src/auth/jwt.refresh.token.guard';
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
  async findUser(@User() user: Users) {
    const userInfo = await this.usersService.findUser(user);
    return userInfo;
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
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logOut(@Headers() headers, @User() user) {
    return this.authService.logout(user);
    // headers.authorization.replace('Bearer', '');
    // return { message: '로그아웃 완료', success: true };
  }

  @ApiOperation({ summary: '토큰 리프레쉬' })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refreshToken')
  async refreshToken(@Body() body) {
    return await this.authService.refreshAccessToken(body);
  }
}
