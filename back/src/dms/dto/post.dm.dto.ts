import { Dms } from '@entities/Dms';
import { PickType } from '@nestjs/swagger';

export class PostDmDto extends PickType(Dms, ['content']) {}
