import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../src/common/decorator/user.decorator';
import { Users } from '@entities/Users';
import { JwtAuthGuard } from '../../src/auth/jwt-auth-guard';
import { CreateWorkspaceChannelDto } from './dto/create.workspace.channel.dto';
import { PostChannelChatDto } from './dto/post.channel.chat.dto';
// import { diskStorage } from 'multer';
// import fs from 'fs';
// import path from 'path';
// const storage = diskStorage({
//   destination: (req, file, cb) => {
//     if (!fs.existsSync('./uploads')) {
//       fs.mkdirSync('./uploads');
//     }

//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     console.log('file', file);
//     const ext = path.extname(file.originalname);
//     const fileName = `${path.basename(file.originalname, ext)}_${Date.now()}${ext}`;
//     cb(null, Buffer.from(fileName, 'latin1').toString('utf-8'));
//   },
// });
@ApiTags('Channel')
@Controller('api/workspaces/')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}
  //채널 목록 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/channels')
  getAllWorkspaceChannels(@Param('url') url, @User() user: Users) {
    return this.channelsService.getAllWorkspaceChannels(
      decodeURIComponent(url),
      user.id,
    );
  }

  //채널 정보 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/channels/:name')
  getWorkspaceChannel(@Param('url') url, @Param('name') name) {
    return this.channelsService.getWorkspaceChannel(url, name);
  }

  //채널 멤버 목록 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/channels/:name/members')
  getAllMembers(@Param() params) {
    return this.channelsService.getWorkspaceChannelMembers(
      params.url,
      params.name,
    );
  }

  //채널 대화 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/channels/:name/chats')
  getChatsFromChannel(@Param() params, @Query() queries) {
    return this.channelsService.getWorkspaceChannelChats(
      params.url,
      params.name,
      queries.perPage,
      queries.page,
    );
  }

  // 채널 만들기
  @UseGuards(JwtAuthGuard)
  @Post(':url/channels')
  creactChannel(
    @Param('name') name,
    @User() user: Users,
    @Body() body: CreateWorkspaceChannelDto,
  ) {
    return this.channelsService.createWorkspaceChannel(
      name,
      user.id,
      body.name,
    );
  }

  //채널 멤버 추가하기
  @UseGuards(JwtAuthGuard)
  @Post(':url/channels/:name/member')
  createMember(@Param() params, @Body() body) {
    return this.channelsService.createWorkspaceChannelMembers(
      params.url,
      params.name,
      body.email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':url/channels/:name/chats')
  postChat(
    @Param('url') url,
    @Param('name') name,
    @Body() body: PostChannelChatDto,
    @User() user: Users,
  ) {
    return this.channelsService.postChat({
      url,
      name,
      content: body.content,
      myId: user.id,
    });
  }

  //읽지 않은 채팅 가져오기
  // @UseGuards(JwtAuthGuard)
  // @Get(':url/channels/:name/unreads')
  // getUnreadChats(
  //   @Param('url') url,
  //   @Param('name') name,
  //   @Query('after') after: number,
  // ) {
  //   return this.channelsService.getUnreadChats(url, name, after);
  // }

  //채널 대화 추가하기
  // @Post(':name/chats')
  // createChat(@Param() params, @Body() body, @User() user) {}
}
