import { Users } from '@entities/Users';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerialize extends PassportSerializer {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    done(null, user.id);
  }
  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail({
        where: {
          id: +userId,
        },
        select: ['id', 'email', 'nickname'],
        relations: ['Workspaces'],
      })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  }
}
