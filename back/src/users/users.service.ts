import { Users } from '@entities/Users';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import { Workspacemembers } from '@entities/Workspacemembers';
import { Channelmembers } from '@entities/Channelmembers';

@Injectable()
export class UsersService {
  //서비스는 repository를 통해서 entitiy에 쿼리를 날린다.
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}
  async findUser(user: Users) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: user.email,
      })
      .innerJoinAndSelect('user.Workspacemembers', 'workspaceMembers')
      .innerJoinAndSelect('workspaceMembers.Workspace', 'workspace')
      .select([
        'user.id',
        'user.nickname',
        'user.email',
        'workspaceMembers',
        'workspace',
      ])
      .getOne();
  }
  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    if (!email) {
      throw new BadRequestException('이메일을 입력해주세요');
    }
    if (!nickname) {
      throw new BadRequestException('닉네임을 입력해주세요');
    }

    if (!password) {
      throw new BadRequestException('비밀번호를 입력해주세요');
    }
    const exUser = await queryRunner.manager.getRepository(Users).findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    try {
      const user = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });

      // 다양한 방법 가능
      // const workspaceMember = new Workspacemembers();
      // const workspaceMember = this.workspaceMembersRepository.create();
      // workspaceMember.WorkspaceId = 1;
      // workspaceMember.UserId = user.id;
      const workspaceMember = new Workspacemembers();
      workspaceMember.WorkspaceId = 1;
      workspaceMember.UserId = user.id;

      await queryRunner.manager
        .getRepository(Workspacemembers)
        .save(workspaceMember);

      const channelMember = new Channelmembers();
      channelMember.ChannelId = 1;
      channelMember.UserId = user.id;
      // await queryRunner.manager.getRepository(Channelmembers).save({
      //   ChannelId: 1,
      //   UserId: user.id,
      // });
      await queryRunner.manager
        .getRepository(Channelmembers)
        .save(channelMember);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
