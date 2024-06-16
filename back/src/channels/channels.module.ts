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
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from 'src/config/multer.config';

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
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
