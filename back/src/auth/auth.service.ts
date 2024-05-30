import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Users } from '@entities/Users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersService: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;
      }
      return null;
    }
  }
  async login(user: Pick<Users, 'id' | 'email'>) {
    // 1
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '10s' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30s' }),
    };
  }

  async refreshAccessToken(user: any) {
    const valid = this.jwtService.verify(user.refreshToken);
    if (!valid) {
      return null;
    }
    const payload = {
      email: user.email,
      id: user.id,
      refreshToken: user.refreshToken,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10s' }); //payload와 생성일, 만료일이 strategy의 payload로 들어감
    return {
      accessToken: accessToken,
    };
  }
}
