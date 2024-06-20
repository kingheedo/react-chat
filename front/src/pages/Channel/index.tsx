import React, { useCallback, useEffect } from 'react';
import { Section } from './styles';
import useGetChannelInfo from '@hooks/useSWR/useGetChannelInfo';
import { useParams } from 'react-router-dom';
import useGetChannelChats from '@hooks/useSWR/useGetChannelChats';
import ChatArea, { Role } from '@components/ChatArea';
import useSendChannelChat from '@hooks/useMutate/useSendChannelChat';
import useSocket from '@hooks/useSocket';
import { IChat } from '@typings/db';
import useUnreadsDateStore from '@store/UnreadsDateStore';
import {
  handleUpdate,
  handleSubmit,
  handleChat,
} from '@pages/Channel/handlers';
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
  const { socket } = useSocket(params.workspaceUrl || '');
  const { socket: sendChatSocket } = useSocket(params.workspaceUrl || '');
  const { setUnreadsDate } = useUnreadsDateStore();
  const { sendChannelChat } = useSendChannelChat();

  useEffect(() => {
    socket?.on('message', (chat: IChat & { url: string }) =>
      handleChat({
        chat,
        channelChats,
        channelInfo,
        mutateChannelChats,
      })
    );

    return () => {
      socket?.off('message', (chat: IChat & { url: string }) =>
        handleChat({
          chat,
          channelChats,
          channelInfo,
          mutateChannelChats,
        })
      );
    };
  }, [socket, channelChats, handleChat]);

  const handleSubmitCallBack = useCallback(
    (content: string) => {
      handleSubmit({
        content,
        params,
        channelChats,
        scrollbarRef,
        sendChatSocket,
        mutateChannelChats,
        sendChannelChat,
        setUnreadsDate,
      });
    },
    [
      params,
      channelChats,
      scrollbarRef,
      sendChatSocket,
      mutateChannelChats,
      sendChannelChat,
      setUnreadsDate,
    ]
  );

  useEffect(() => {
    setUnreadsDate(
      `${params.workspaceUrl}-${params.channelName}`,
      String(new Date().getTime())
    );
  }, [params.workspaceUrl, params.channelName]);

  const handleUpdateCallBack = useCallback(async () => {
    await handleUpdate(setSize);
  }, [setSize]);

  return (
    <Section className="channel">
      <ChatArea
        role={Role.CHAT}
        list={channelChats || []}
        isLastData={isLastData}
        isLoading={isLoading}
        scrollbarRef={scrollbarRef}
        handleUpdate={handleUpdateCallBack}
        handleSubmit={handleSubmitCallBack}
      />
    </Section>
  );
};

export default Channel;
