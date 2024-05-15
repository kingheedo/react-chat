import { Controller, Get, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('worspaces/:url/channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}
  //채널 목록 가져오기
  @Get(':name')
  getChannels() {}

  // 채널 만들기
  @Post()
  creactChannel() {}

  //채널 멤버 목록 가져오기
  @Get(':name/members')
  getAllMembersFromChannel() {}

  //채널 멤버 추가하기
  @Post(':name/member')
  createMember() {}

  //채널 대화 가져오기
  @Get(':name/chats')
  getChatsFromChannel() {}

  //채널 대화 추가하기
  @Post(':name/chats')
  createChat() {}
}
