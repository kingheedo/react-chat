import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workspaces } from './Workspaces';
import { Dms } from './Dms';
import { Channelchats } from './Channelchats';
import { Channelmembers } from './Channelmembers';
import { Workspacemembers } from './Workspacemembers';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity('users', { schema: 'reactchat' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @ApiProperty({
    example: 'dhkdgmleh@gmail.com',
    description: '사용자  이메일',
  })
  @Column({ type: 'varchar', name: 'email', unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '나는짱',
    description: '사용자 닉네임',
  })
  @Column({ type: 'varchar', name: 'nickname', length: 30 })
  nickname: string;

  // @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '*******',
    description: '사용자 비밀번호',
  })
  @Column({ type: 'varchar', name: 'password', length: 100 })
  password: string;

  @ApiProperty({
    example: '******',
    description: '사용자 리프레쉬 토큰',
  })
  @Column({ type: 'text', name: 'refreshtoken', nullable: true })
  refreshtoken: string;

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

  @OneToMany(() => Workspaces, (workspace) => workspace.Owner)
  Workspaces: Workspaces[];

  @OneToMany(() => Dms, (dms) => dms.Sender)
  Dms: Dms[];

  @OneToMany(() => Dms, (dms) => dms.Receiver)
  Dms2: Dms[];

  @OneToMany(() => Channelchats, (channels) => channels.User)
  Channelchats: Channelchats[];

  @OneToMany(() => Channelmembers, (channelmembers) => channelmembers.User)
  Channelmembers: Channelmembers[];

  @OneToMany(
    () => Workspacemembers,
    (workspacemembers) => workspacemembers.User,
  )
  Workspacemembers: Workspacemembers[];
}
