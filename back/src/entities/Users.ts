import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspaces } from './Workspaces';
import { Dms } from './Dms';
import { Channelchats } from './Channelchats';
import { Channelmembers } from './Channelmembers';
import { Workspacemembers } from './Workspacemembers';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'react-chat-test' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'dhkdgmleh@gmail.com',
    description: '사용자  이메일',
  })
  @Column({ type: 'varchar', name: 'email', unique: true, length: 30 })
  email: string;

  @ApiProperty({
    example: '나는짱',
    description: '사용자 닉네임',
  })
  @Column({ type: 'varchar', name: 'nickname', length: 30 })
  nickname: string;

  @ApiProperty({
    example: '*******',
    description: '사용자 비밀번호',
  })
  @Column({ type: 'varchar', name: 'password', length: 100 })
  password: string;

  @ApiProperty({
    example: '2022-12-12',
    description: '생성 날짜',
  })
  @Column({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-12',
    description: '수정 날짜',
  })
  @Column({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-12-12',
    description: '삭제 날짜',
  })
  @Column({ type: 'datetime', name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Workspaces, (workspace) => workspace.OwnerId)
  Workspaces: Workspaces[];

  @OneToMany(() => Dms, (dms) => dms.SenderId)
  Dms: Dms[];

  @OneToMany(() => Dms, (dms) => dms.ReceiverId)
  Dms2: Dms[];

  @OneToMany(() => Channelchats, (channels) => channels.UserId)
  Channelchats: Channelchats[];

  @OneToMany(() => Channelmembers, (channelmembers) => channelmembers.UserId)
  Channelmembers: Channelmembers[];

  @OneToMany(
    () => Workspacemembers,
    (workspacemembers) => workspacemembers.UserId,
  )
  Workspacemembers: Workspacemembers[];
}
