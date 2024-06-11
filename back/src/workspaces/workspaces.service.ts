import { Channelmembers } from '@entities/Channelmembers';
import { Channels } from '@entities/Channels';
import { Users } from '@entities/Users';
import { Workspacemembers } from '@entities/Workspacemembers';
import { Workspaces } from '@entities/Workspaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Workspaces)
    private workspaceRepository: Repository<Workspaces>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getWorkSpaces(myId: number) {
    // return this.workspaceRepository.find({
    //   where: {
    //     Workspacemembers: [{ UserId: myId }],
    //   },
    // });
    return this.workspaceRepository
      .createQueryBuilder('workspaces')
      .innerJoinAndSelect(
        'workspaces.Workspacemembers',
        'members',
        'members.UserId = :myId',
        {
          myId,
        },
      )
      .getMany();
  }

  async getWorkspaceMembers(url: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.Workspacemembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
        //sql injection 방어
        url,
      })
      .getMany();
  }

  async getWorkspaceMember(url: string, id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }
  async createWorkspace(name, url, OwnerId) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // const workspace = await this.workspaceRepository.create({
    //   //create하면 객체만 생성하기 때문에 save를 해야함
    //   name,
    //   url,
    //   OwnerId,
    // });

    // const resultWorkspace = await this.workspaceRepository.save(workspace);

    //워크스페이스 생성
    try {
      const workspace = new Workspaces();
      workspace.name = name;
      workspace.url = url;
      workspace.OwnerId = OwnerId;

      const returnedWorkspace = await queryRunner.manager
        .getRepository(Workspaces)
        .save(workspace);

      //워크스페이스 멤버, 채널 생성
      const workspaceMember = new Workspacemembers();
      workspaceMember.WorkspaceId = returnedWorkspace.id;
      workspaceMember.UserId = OwnerId;

      const channel = new Channels();
      channel.name = '일반';
      channel.WorkspaceId = returnedWorkspace.id;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, returnedChannel] = await Promise.all([
        queryRunner.manager
          .getRepository(Workspacemembers)
          .save(workspaceMember),
        queryRunner.manager.getRepository(Channels).save(channel),
      ]);

      //채널 멤버 생성
      const channelMembers = new Channelmembers();
      channelMembers.ChannelId = returnedChannel.id;
      channelMembers.UserId = OwnerId;
      await queryRunner.manager
        .getRepository(Channelmembers)
        .save(channelMembers);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createWorkspaceMember(url: string, email: string) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const workspace = await queryRunner.manager
      .getRepository(Workspaces)
      .findOne({
        where: {
          url,
        },
      });

    const user = await queryRunner.manager.getRepository(Users).findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }
    try {
      const workspaceMember = new Workspacemembers();
      workspaceMember.WorkspaceId = workspace.id;
      workspaceMember.UserId = user.id;
      await queryRunner.manager
        .getRepository(Workspacemembers)
        .save(workspaceMember);

      const channelMember = new Channelmembers();
      const channel = await queryRunner.manager
        .getRepository(Channels)
        .findOne({
          where: {
            name: '일반',
          },
        });
      channelMember.ChannelId = channel.id;
      channelMember.UserId = user.id;

      await queryRunner.manager
        .getRepository(Channelmembers)
        .save(channelMember);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
