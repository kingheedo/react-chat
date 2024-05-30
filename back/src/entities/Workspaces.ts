import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Channels } from './Channels';
import { Dms } from './Dms';
import { Workspacemembers } from './Workspacemembers';

@Entity('workspaces', { schema: 'react-chat-test' })
export class Workspaces {
  @ApiProperty({
    example: 1,
    description: '워크스페이스 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '네이버',
    description: '워크스페이스 이름',
  })
  @Column({ type: 'varchar', name: 'name', unique: true, length: 30 })
  name: string;

  @ApiProperty({
    example: 'general',
    description: '워크스페이스 url',
  })
  @Column({ type: 'varchar', name: 'url', unique: true, length: 30 })
  url: string;

  @Column({ type: 'int', name: 'OwnerId', nullable: true })
  OwnerId: number | null;

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

  @ManyToOne(() => Users, (users) => users.Workspaces, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: Users;

  @OneToMany(() => Channels, (channels) => channels.WorkspaceId)
  Channels: Channels[];

  @OneToMany(() => Dms, (dms) => dms.WorkspaceId)
  Dms: Dms[];

  @OneToMany(
    () => Workspacemembers,
    (workspacemembers) => workspacemembers.WorkspaceId,
  )
  Workspacemembers: Workspacemembers[];
}
