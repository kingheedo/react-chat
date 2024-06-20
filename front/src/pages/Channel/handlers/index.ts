import { SendChannelChatReq } from '@hooks/useMutate/useSendChannelChat';
import { IChannel, IChat } from '@typings/db';
import Scrollbars from 'react-custom-scrollbars-2';
import { Params } from 'react-router-dom';
import { Socket } from 'socket.io-client';

/** 채널 채팅 추가로 가져오기  */
export const handleUpdate = async (
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<IChat[][] | undefined>
) => {
  await setSize((prev) => prev + 1);
};

/** 채널메시지 보내기
 *
 * 1. 채널메시지 보내고  optimistic update
 * 2. socket으로 채널메시지 보내기
 */
export const handleSubmit = async ({
  content,
  params,
  channelChats,
  scrollbarRef,
  sendChatSocket,
  mutateChannelChats,
  sendChannelChat,
  setUnreadsDate,
}: {
  content: string;
  params: Readonly<Params<string>>;
  channelChats?: IChat[][];
  scrollbarRef: React.MutableRefObject<Scrollbars | null>;
  sendChatSocket?: Socket;
  mutateChannelChats: (
    data?: IChat[][],
    opts?: any
  ) => Promise<IChat[][] | undefined>;
  sendChannelChat: (payload: SendChannelChatReq) => Promise<any>;
  setUnreadsDate: (key: string, value: string) => any;
}) => {
  if (!content) {
    return;
  }
  try {
    const returnedChat = await sendChannelChat({
      workspaceUrl: params.workspaceUrl || '',
      channelName: params.channelName || '',
      data: {
        content,
      },
    });

    const insertData = {
      Channel: {
        WorkspaceId: returnedChat.Channel.WorkspaceId,
        id: returnedChat.Channel.id,
        name: returnedChat.Channel.name,
        private: returnedChat.Channel.private,
      },
      ChannelId: returnedChat.ChannelId,
      User: {
        email: returnedChat.User.email,
        id: returnedChat.User.id,
        nickname: returnedChat.User.nickname,
      },
      id: returnedChat.id,
      UserId: returnedChat.UserId,
      content: returnedChat.content,
      createdAt: returnedChat.createdAt,
    } as any;

    channelChats &&
      insertData &&
      (await mutateChannelChats(channelChats, {
        optimisticData: [[insertData, ...channelChats[0]]],
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }));

    setUnreadsDate(
      `${params.workspaceUrl}-${params.channelName}`,
      String(new Date().getTime())
    );

    await sendChatSocket?.emit('clientMessage', {
      url: params.workspaceUrl,
      content: returnedChat,
    });
    scrollbarRef.current?.scrollToBottom();
  } catch (err) {
    console.log('err', err);
  }
};

/** 소켓 응답데이터 받아와서 채널 데이터 업데이트하기
 *
 * 1. 채팅 보낸 당사자는 해당x
 */
export const handleChat = async ({
  chat,
  channelChats,
  channelInfo,
  mutateChannelChats,
}: {
  chat: IChat & { url: string };
  channelChats?: IChat[][];
  channelInfo?: IChannel;
  mutateChannelChats: (data?: IChat[][], opts?: any) => Promise<any>;
}) => {
  if (channelInfo?.id === chat.ChannelId) {
    try {
      chat &&
        channelChats &&
        (await mutateChannelChats(channelChats, {
          optimisticData: [[chat, ...channelChats[0]]],
          populateCache: false,
          revalidate: false,
          rollbackOnError: true,
        }));
    } catch (error) {
      console.error(error);
    }
  }
};
