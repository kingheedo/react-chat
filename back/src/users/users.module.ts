import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@entities/Users';
import { AuthModule } from '../../src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Users])], //레포지토리 injection
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
