import { Channelchats } from '@entities/Channelchats';
import { PickType } from '@nestjs/swagger';

export class PostChannelChatDto extends PickType(Channelchats, ['content']) {}
