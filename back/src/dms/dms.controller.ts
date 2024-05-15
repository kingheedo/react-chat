import { Controller, Get, Post } from '@nestjs/common';
import { DmsService } from './dms.service';

@Controller('workspaces/:url/dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}
  @Get(':id/chats')
  getChat() {}

  @Post(':id/chats')
  postChat() {}
}
