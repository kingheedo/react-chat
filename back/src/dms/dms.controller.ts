import { Controller, Get, Post, Query } from '@nestjs/common';
import { DmsService } from './dms.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('workspaces/:url/dms')
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
  @Get(':id/chats')
  getChat(@Query() query) {
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  postChat() {}
}
