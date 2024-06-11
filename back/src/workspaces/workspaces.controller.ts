import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../../src/common/decorator/user.decorator';
import { Users } from '@entities/Users';
import { CreateWorkspace } from './dto/create.workspace.dto';
import { CreateWorkspaceMember } from './dto/create.workspace.member.dto';
import { JwtAuthGuard } from '../../src/auth/jwt-auth-guard';

@ApiTags('Workspace')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}
  @UseGuards(JwtAuthGuard)
  //워크스페이스 리스트 가져오기
  @Get()
  getWorkSpaces(@User() user: Users) {
    console.log('user', user);

    return this.workspacesService.getWorkSpaces(user.id);
  }

  //워크스페이스 멤버 목록 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/members')
  getMembers(@Param() param) {
    return this.workspacesService.getWorkspaceMembers(param.url);
  }

  //워크스페이스 특정 멤버 가져오기
  @UseGuards(JwtAuthGuard)
  @Get(':url/members/:id')
  getMember(@Param() params) {
    return this.workspacesService.getWorkspaceMember(params.url, params.id);
  }

  //워크스페이스 추가하기
  @UseGuards(JwtAuthGuard)
  @Post()
  createWorkSpace(@Body() body: CreateWorkspace, @User() user: Users) {
    return this.workspacesService.createWorkspace(body.name, body.url, user.id);
  }

  //워크스페이스 멤버 추가하기
  @UseGuards(JwtAuthGuard)
  @Post(':url/member')
  createMember(@Param() param, @Body() body: CreateWorkspaceMember) {
    return this.workspacesService.createWorkspaceMember(param.url, body.email);
  }
}
