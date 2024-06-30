import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspaces } from './Workspaces';
import { Channelchats } from './Channelchats';
import { Channelmembers } from './Channelmembers';

@Entity('channels', { schema: 'reactchat' })
export class Channels {
  @ApiProperty({
    example: 1,
    description: '채널 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '일반',
    description: '채널 이름',
  })
  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;

  @Column({ type: 'int', name: 'WorkspaceId', nullable: true })
  WorkspaceId: number | null;

  @ApiProperty({
    example: '2022-12-12',
    description: '생성 날짜',
  })
  @Column({
    type: 'datetime',
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-12',
    description: '수정 날짜',
  })
  @Column({
    type: 'datetime',
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2022-12-12',
    description: '삭제 날짜',
  })
  @Column({ type: 'datetime', name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.Channels, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  Workspace: Workspaces[];

  @OneToMany(() => Channelchats, (channelchats) => channelchats.Channel)
  Channelchats: Channelchats[];

  @OneToMany(() => Channelmembers, (channelmembers) => channelmembers.Channel)
  Channelmembers: Channelmembers[];
}
