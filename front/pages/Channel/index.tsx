import React, { useEffect } from 'react';
import { Section } from './styles';
import useGetChannelInfo from '@hooks/useSWR/useGetChannelInfo';
import { useParams } from 'react-router-dom';
import useGetChannelChats from '@hooks/useSWR/useGetChannelChats';
import ChatArea, { Role } from '@components/ChatArea';
import useSendChannelChat from '@hooks/useMutate/useSendChannelChat';
import useSocket from '@hooks/useSocket';
import { IChat } from '@typings/db';

const Channel = () => {
  const params = useParams();
  const { channelInfo } = useGetChannelInfo({
    workspaceUrl: params.workspaceUrl || '',
    channelName: params.channelName || '',
  });

  const {
    channelChats,
    mutateChannelChats,
    setSize,
    isLastData,
    isLoading,
    scrollbarRef,
  } = useGetChannelChats({
    workspaceUrl: params.workspaceUrl || '',
    channelName: params.channelName || '',
  });
  const { sendChannelChat } = useSendChannelChat();
  const { socket } = useSocket(params.workspaceUrl || '');
  const { socket: sendChatSocket, disconnect: disconnectChat } = useSocket(
    params.workspaceUrl || ''
  );

  /** 채널 채팅 가져오기 후  */
  const handleUpdate = async () => {
    await setSize((prev) => prev + 1);
  };

  /** 채널메시지 보내기
   *
   * 1. 채널메시지 보내고  optimistic update
   * 2. socket으로 채널메시지 보내기
   */
  const handleSubmit = async (content: string) => {
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

      await sendChatSocket?.emit('clientMessage', {
        url: params.workspaceUrl,
        channelId: channelInfo?.id,
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
  const handleChat = async (chat: IChat) => {
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

  useEffect(() => {
    socket?.on('message', handleChat);

    return () => {
      socket?.off('message', handleChat);
    };
  }, [socket, channelChats, handleChat]);

  return (
    <Section className="channel">
      <ChatArea
        role={Role.CHAT}
        list={channelChats || []}
        isLastData={isLastData}
        isLoading={isLoading}
        scrollbarRef={scrollbarRef}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
      />
    </Section>
  );
};

export default Channel;
