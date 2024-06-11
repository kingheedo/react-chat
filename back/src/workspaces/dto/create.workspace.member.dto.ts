import { Users } from '@entities/Users';
import { PickType } from '@nestjs/swagger';

export class CreateWorkspaceMember extends PickType(Users, ['email']) {}
