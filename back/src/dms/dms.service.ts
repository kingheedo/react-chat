import { Injectable } from '@nestjs/common';
import { PostDmDto } from './dto/post.dm.dto';
import { DataSource, Repository } from 'typeorm';
import { Dms } from '@entities/Dms';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from '@entities/Workspaces';

@Injectable()
export class DmsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Dms)
    private dmsRepository: Repository<Dms>,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
  ) {}

  async getDms({
    url,
    id,
    myId,
    perPage,
    page,
  }: {
    url: string;
    id: string;
    myId: number;
    perPage: number;
    page: number;
  }) {
    const dms = await this.dmsRepository
      .createQueryBuilder('dms')
      .innerJoin('dms.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .innerJoinAndSelect('dms.Receiver', 'receiver')
      .innerJoinAndSelect('dms.Sender', 'sender')
      .where(
        '(dms.ReceiverId = :id AND dms.SenderId = :myId) OR (dms.ReceiverId = :myId AND dms.SenderId = :id)',
        {
          id,
          myId,
        },
      )
      .orderBy('dms.createdAt', 'DESC')
      .take(perPage)
      .skip(perPage * (page - 1))
      .getMany();

    return dms;
  }

  async postChat({
    url,
    content,
    id,
    myId,
  }: {
    url: string;
    content: PostDmDto['content'];
    id: number;
    myId: number;
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const workspace = await this.workspacesRepository
      .createQueryBuilder('workspace')
      .where('workspace.url = :url', {
        url,
      })
      .getOne();

    await queryRunner.startTransaction();
    try {
      const dm = new Dms();
      dm.ReceiverId = id;
      dm.SenderId = myId;
      dm.content = content;
      dm.WorkspaceId = workspace.id;
      const returedDm = await queryRunner.manager.getRepository(Dms).save(dm);
      await queryRunner.commitTransaction();

      const findDm = await this.dmsRepository
        .createQueryBuilder('dms')
        .where('dms.id = :dmId', {
          dmId: returedDm.id,
        })
        .innerJoin('dms.Sender', 'sender', 'sender.id = :myId', {
          myId: myId,
        })
        .addSelect(['sender.id', 'sender.email', 'sender.nickname'])
        .innerJoin('dms.Receiver', 'receiver', 'receiver.id = :id', {
          id: id,
        })
        .addSelect(['receiver.id', 'receiver.email', 'receiver.nickname'])
        .getOne();

      return findDm;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
