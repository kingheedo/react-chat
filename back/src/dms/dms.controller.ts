import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DmsService } from './dms.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { PostDmDto } from './dto/post.dm.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Users } from '@entities/Users';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}
  @ApiParam({
    name: 'url',
    description: '워크스페이스 url',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: '사용자 id',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    description: '한 번에 가져오는 개수',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: '불러올 페이지',
    required: true,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id/chats')
  getDms(
    @Param('url') url: string,
    @Param('id') id: string,
    @User() user: Users,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.dmsService.getDms({ url, id, myId: user.id, perPage, page });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/chats')
  postChat(
    @Param('url') url,
    @Param('id', ParseIntPipe) id: number,
    @Body('content') content: PostDmDto['content'],
    @User() user,
  ) {
    return this.dmsService.postChat({ url, content, id, myId: user.id });
  }
}
