import { Workspaces } from '@entities/Workspaces';
import { PickType } from '@nestjs/swagger';

export class CreateWorkspaceChannelDto extends PickType(Workspaces, ['name']) {}
