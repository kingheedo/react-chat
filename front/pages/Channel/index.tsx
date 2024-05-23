import React, { useEffect } from 'react';
import { Section } from './styles';
import useGetChannelInfo from '@hooks/useSWR/useGetChannelInfo';
import { useParams } from 'react-router-dom';
import useGetChannelChats from '@hooks/useSWR/useGetChannelChats';
import ChatArea, { Role } from '@components/ChatArea';
import useSendChannelChat from '@hooks/useMutate/useSendChannelChat';
import useSocket from '@hooks/useSocket';

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

  /** 채널 채팅 가져오기 후  */
  const handleUpdate = async () => {
    await setSize((prev) => prev + 1);
  };

  /** 채팅 보내기 */
  const handleSubmit = async (content: string) => {
    if (!content) {
      return;
    }
    try {
      await sendChannelChat({
        workspaceUrl: params.workspaceUrl || '',
        channelName: params.channelName || '',
        data: {
          content,
        },
      });
      scrollbarRef.current?.scrollToBottom();
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleChat = (chat: any) => {
    let prevChannelChats = channelChats as any;

    prevChannelChats = [
      [
        {
          Channel: {
            WorkspaceId: chat.Channel.WorkspaceId,
            id: chat.Channel.id,
            name: chat.Channel.name,
            private: chat.Channel.private,
          },
          User: {
            email: chat.User.email,
            id: chat.User.id,
            nickname: chat.User.nickname,
          },
          id: chat.id,
          UserId: chat.UserId,
          content: chat.content,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        },
        ...prevChannelChats[0],
      ],
    ];
    mutateChannelChats(prevChannelChats, false);
  };

  useEffect(() => {
    socket?.on('message', handleChat);

    return () => {
      socket?.off('message', handleChat);
    };
  }, [socket, channelChats]);

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
