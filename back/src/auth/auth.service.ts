import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import bcryptjs from 'bcryptjs';
import { Users } from '@entities/Users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    private dataSource: DataSource,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isMatch = bcryptjs.compare(password, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
      return null;
    }
  }

  async saveRefreshToken(userId: number, refreshtoken: string) {
    const findUser = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder()
        .where('users.id = :userId', {
          userId: findUser.id,
        })
        .update()
        .set({
          refreshtoken,
        })
        .execute();
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async logout(user) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.usersRepository
        .createQueryBuilder('users')
        .where('users.id = :id', { id: user.id })
        .update()
        .set({
          refreshtoken: null,
        })
        .execute();

      await queryRunner.commitTransaction();
      return '로그아웃 완료';
    } catch (error) {
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async login(user: Pick<Users, 'id' | 'email'>) {
    // 1
    const payload = { id: user.id, email: user.email };
    console.log('login, payload', payload);

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: '30s',
    });
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
    const isSavedRefreshToken = await this.saveRefreshToken(
      user.id,
      refreshToken,
    );

    if (!accessToken || !refreshToken || !isSavedRefreshToken) {
      return null;
    }
    return {
      accessToken,
      refreshToken,
    };
    //db에 refreshToken 저장필요
  }

  async refreshAccessToken(data) {
    //db에 user의 refreshToken이 파라미터로 들어온 data.refreshToken 과 같은지 여부 확인후 accessToken 재발급 진행 그렇지 않으면 재로그인 하도록 에러발생
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('refreshtoken = :refreshtoken', {
        refreshtoken: data.refreshToken,
      })
      .select(['users.id', 'users.email', 'users.refreshtoken'])
      .getOne();

    if (!user) {
      return null;
    }
    //refreshToken토큰으로 유저 찾고 payload에 유저id, email 넣어주기
    const valid = this.jwtService.verify(data.refreshToken);
    if (!valid) {
      return null;
    }
    const payload = {
      id: user.id,
      email: user.email,
      // refreshToken: user.refreshtoken,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10s' }); //payload와 생성일, 만료일이 strategy의 payload로 들어감
    return {
      accessToken: accessToken,
    };
  }
}
