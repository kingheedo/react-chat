import { Workspaces } from '@entities/Workspaces';
import { PickType } from '@nestjs/swagger';

export class CreateWorkspace extends PickType(Workspaces, [
  'name',
  'url',
  'OwnerId',
]) {}
