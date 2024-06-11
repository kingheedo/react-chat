import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspaces } from '@entities/Workspaces';
import { Workspacemembers } from '@entities/Workspacemembers';
import { Channelmembers } from '@entities/Channelmembers';
import { Users } from '@entities/Users';
import { Channels } from '@entities/Channels';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workspaces,
      Workspacemembers,
      Channels,
      Channelmembers,
      Users,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
