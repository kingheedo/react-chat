import { Channelchats } from '@entities/Channelchats';
import { Channelmembers } from '@entities/Channelmembers';
import { Channels } from '@entities/Channels';
import { Users } from '@entities/Users';
import { Workspaces } from '@entities/Workspaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsGateway } from '../../src/events/events.gateway';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(Channelmembers)
    private channelmembersRepository: Repository<Channelmembers>,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Channelchats)
    private channelChatsRepository: Repository<Channelchats>,
    private readonly eventsGateWay: EventsGateway,
  ) {}

  async findById(id: number) {
    return this.channelsRepository.find({
      where: {
        id,
      },
    });
  }

  async getAllWorkspaceChannels(url: string, myId: number) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.Channelmembers',
        'members',
        'members.UserId = :myId',
        {
          myId,
        },
      )
      .innerJoinAndSelect(
        'channels.Workspace',
        'workspace',
        'workspace.url = :url',
        {
          url,
        },
      )
      .getMany();
  }

  async getWorkspaceChannel(url: string, name: string) {
    return this.channelsRepository
      .createQueryBuilder('channel')
      .innerJoin('channel.Workspace', 'workspace', 'url = :url', {
        url,
      })
      .where('channel.name = :name', {
        name,
      })
      .getOne();
  }

  async getWorkspaceChannelMembers(url: string, name: string) {
    return this.channelmembersRepository
      .createQueryBuilder('channelmembers')
      .innerJoin('channelmembers.Channel', 'channel', 'channel.name = :name', {
        name,
      })
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceChannel(
    workspaceName: string,
    myId: number,
    channelName: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const workspace = await this.workspacesRepository.findOne({
      where: {
        name: workspaceName,
      },
    });

    if (!workspace) {
      return null;
    }
    try {
      const channel = new Channels();
      channel.name = channelName;
      channel.WorkspaceId = workspace.id;
      const returnedChannel = await queryRunner.manager
        .getRepository(Channels)
        .save(channel);

      const channelMember = new Channelmembers();
      channelMember.ChannelId = returnedChannel.id;
      channelMember.UserId = myId;
      await queryRunner.manager
        .getRepository(Channelmembers)
        .save(channelMember);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async createWorkspaceChannelMembers(
    url: string,
    name: string,
    email: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const channel = await this.channelsRepository
      .createQueryBuilder('channel')
      .where('channel.name = :name', { name })
      .innerJoin('channel.Workspace', 'workspace', 'url = :url', {
        url,
      })
      .getOne();
    if (!channel) {
      throw new NotFoundException('채널이 존재하지 않습니다');
    }

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .innerJoin('user.Workspaces', 'workspace', 'worspace.url = :url', {
        url,
      })
      .getOne();

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    const channelmember = new Channelmembers();
    channelmember.ChannelId = channel.id;
    channelmember.UserId = user.id;
    await queryRunner.manager.getRepository(Channelmembers).save(channelmember);
    try {
      queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
    } finally {
      queryRunner.release();
    }
  }

  async getWorkspaceChannelChats(
    url: string,
    name: string,
    perPage: number,
    page: number,
  ) {
    return this.channelChatsRepository
      .createQueryBuilder('channelchats')
      .innerJoin('channelchats.Channel', 'channel', 'name = :name', {
        name,
      })
      .innerJoin('channel.Workspace', 'workspace', 'url = :url', {
        url,
      })
      .innerJoinAndSelect('channelchats.User', 'user')
      .orderBy('channelchats.createdAt', 'DESC')
      .take(perPage)
      .skip(perPage * (page - 1))
      .getMany();
  }

  async postChat({ url, name, content, myId }) {
    const channel = await this.channelsRepository
      .createQueryBuilder('channels')
      .where('channels.name = :name', { name })
      .innerJoin('channels.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getOne();

    if (!channel) {
      throw new NotFoundException('채널이 존재하지 않습니다.');
    }

    const chat = new Channelchats();
    chat.ChannelId = channel.id;
    chat.UserId = myId;
    chat.content = content;
    const savedChat = await this.channelChatsRepository.save(chat);
    const chats = await this.channelChatsRepository
      .createQueryBuilder('channelChats')
      .where('channelChats.id = :savedChatId', {
        savedChatId: savedChat.id,
      })
      .innerJoinAndSelect('channelChats.User', 'user', 'user.id = :userId', {
        userId: savedChat.UserId,
      })
      .innerJoinAndSelect(
        'channelChats.Channel',
        'channel',
        'channel.name = :name',
        {
          name: channel.name,
        },
      )
      .getOne();
    return chats;
  }

  async getUnreadsChatsCount({
    url,
    name,
    after,
  }: {
    url: string;
    name: string;
    after: number;
  }) {
    const channelChatsCounts = await this.channelChatsRepository
      .createQueryBuilder('channelChats')
      .innerJoin('channelChats.Channel', 'channel', 'channel.name = :name', {
        name,
      })
      .innerJoin('channel.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .where('channelChats.createdAt > :after', {
        after: new Date(after),
      })
      .getCount();

    return channelChatsCounts;
  }
}
