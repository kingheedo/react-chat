import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspaces } from './Workspaces';
import { Users } from './Users';

@Entity('dms', { schema: 'react-chat-test' })
export class Dms {
  @ApiProperty({
    example: 1,
    description: '디엠 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '안녕?',
    description: '콘텐츠 내용',
  })
  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'int', name: 'WorkspaceId', nullable: true })
  WorkspaceId: number | null;

  @Column({ type: 'int', name: 'SenderId', nullable: true })
  SenderId: number | null;

  @Column({ type: 'int', name: 'ReceiverId', nullable: true })
  ReceiverId: number | null;

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

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.Dms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  Workspace: Workspaces;

  @ManyToOne(() => Users, (users) => users.Dms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SenderId', referencedColumnName: 'id' }])
  Sender: Users;

  @ManyToOne(() => Users, (users) => users.Dms2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ReceiverId', referencedColumnName: 'id' }])
  Receiver: Users;
}
