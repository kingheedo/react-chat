import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channels } from './Channels';
import { Users } from './Users';

@Entity('channelchats', { schema: 'react-chat-test' })
export class Channelchats {
  @ApiProperty({
    example: 1,
    description: '채널 채팅 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '안녕?',
    description: '채널 채팅 내용',
  })
  @Column({ type: 'varchar', name: 'contnet' })
  content: string;

  @Column({ type: 'int', name: 'ChannelId', nullable: true })
  ChannelId: number | null;

  @Column({ type: 'int', name: 'UserId', nullable: true })
  UserId: number | null;

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

  @ManyToOne(() => Channels, (channels) => channels.Channelchats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: Channels;

  @ManyToOne(() => Users, (users) => users.Channelchats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
