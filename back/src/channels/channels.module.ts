import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from '@entities/Channels';
import { Workspaces } from '@entities/Workspaces';
import { Users } from '@entities/Users';
import { Channelmembers } from '@entities/Channelmembers';
import { Channelchats } from '@entities/Channelchats';
import { EventsModule } from '../../src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      Channelmembers,
      Workspaces,
      Users,
      Channelchats,
    ]),
    EventsModule,
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
