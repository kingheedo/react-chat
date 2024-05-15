import { WorkspacesService } from './workspaces.service';
import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}
  @Get(':url')
  //워크스페이스 리스트 가져오기
  getWorkSpaces() {}

  //워크스페이스 추가하기
  @Post()
  createWorkSpace() {}

  //워크스페이스 멤버 목록 가져오기
  @Get(':url/members')
  getAllMemberFromWorkSpaces() {}

  //워크스페이스 멤버 추가하기
  @Post(':url/member')
  createMember() {}

  @Delete(':url/members/:id')
  deleteMember() {}

  //워크스페이스 특정 멤버 가져오기
  @Get(':url/members/:id')
  getMemberFromWorkSpaces() {}
}
