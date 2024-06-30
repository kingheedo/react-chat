import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Channels } from './Channels';

@Entity('channelmembers', { schema: 'reactchat' })
export class Channelmembers {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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

  @Column({ type: 'int', name: 'UserId' })
  UserId: number;

  @Column({ type: 'int', name: 'ChannelId' })
  ChannelId: number;

  @ManyToOne(() => Users, (users) => users.Channelmembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Channels, (channels) => channels.Channelmembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: Channels;
}
