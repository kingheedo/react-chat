import { Users } from '@entities/Users';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  //서비스는 repository를 통해서 entitiy에 쿼리를 날린다.
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async findUser(email: string) {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        email,
      },
      select: ['id', 'email', 'nickname'],
    });

    return user;
  }
  async join(email: string, nickname: string, password: string) {
    console.log('email', email);
    console.log('nickname', nickname);
    console.log('password', password);

    if (!email) {
      throw new BadRequestException('이메일을 입력해주세요');
    }
    if (!nickname) {
      throw new BadRequestException('닉네임을 입력해주세요');
    }

    if (!password) {
      throw new BadRequestException('비밀번호를 입력해주세요');
    }
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
