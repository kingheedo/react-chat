import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dms } from '@entities/Dms';
import { Workspaces } from '@entities/Workspaces';

@Module({
  imports: [TypeOrmModule.forFeature([Dms, Workspaces])],
  providers: [DmsService],
  controllers: [DmsController],
})
export class DmsModule {}
