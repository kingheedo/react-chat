import ChatBadge from '@components/ChatBadge';
import HashIcon from '@components/Icon/HashIcon';
import SideListItem from '@components/SideListItem';
import useGetChannelInfo from '@hooks/useSWR/useGetChannelInfo';
import useGetUnreadChannelChatsCounts from '@hooks/useSWR/useGetUnreadChannelChatsCounts';
import useSocket from '@hooks/useSocket';
import useUnreadsDateStore from '@store/UnreadsDateStore';
import { IChat } from '@typings/db';
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

interface IChannelItemProps {
  workspaceUrl: string;
  channelName: string;
}

const ChannelItem = ({ workspaceUrl, channelName }: IChannelItemProps) => {
  const params = useParams();
  const { socket } = useSocket(params.workspaceUrl || '');
  const { unreadsDate, setUnreadsDate } = useUnreadsDateStore();

  const getUnreadsDate = useMemo(() => {
    const targetidx = unreadsDate.findIndex(
      (unread) => unread[`${workspaceUrl}-${channelName}`]
    );
    if (targetidx > -1) {
      return Number(unreadsDate[targetidx][`${workspaceUrl}-${channelName}`]);
    } else {
      return 0;
    }
  }, [unreadsDate, workspaceUrl, channelName]);

  const { unreadsChatsCount, mutateUnreadsChatsCount } =
    useGetUnreadChannelChatsCounts({
      workspaceUrl,
      channelName,
      after: getUnreadsDate,
    });

  const { channelInfo } = useGetChannelInfo({
    workspaceUrl: params.workspaceUrl || '',
    channelName: params.channelName || '',
  });

  //params.workspaceUrl과 params.ChannnelName이 각각 workspaceUrl,channelName와 같을때
  //localstorage를 현재 날짜로 업데이트 => 유저가 읽은거니까

  /** socket 채팅응답 핸들러
   *
   * 1. 현재 접속한 채널과 socket 채팅응답 채널의 id가 같으면 해당 채널에 유저가 있으므로 after 날짜 업데이트
   * 2. 각 채널아이템과 socket 채팅응답의 chat.url, chat.Channel.name을 비교하여 모두 같으면 undreads 다시 불러오기
   */
  const handleChat = async (chat: IChat & { url: string }) => {
    if (chat.url === workspaceUrl && chat.Channel.name === channelName) {
      mutateUnreadsChatsCount();
    }
  };

  const handleFocus = () => {
    if (
      params.workspaceUrl === workspaceUrl &&
      params.channelName === channelName
    ) {
      setUnreadsDate(
        `${params.workspaceUrl}-${params.channelName}`,
        String(new Date().getTime())
      );
    }
  };

  /** window창 focus시 unreadsDate 최신화 */
  useEffect(() => {
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [params, workspaceUrl, channelName]);

  useEffect(() => {
    socket?.on('message', handleChat);

    return () => {
      socket?.off('message', handleChat);
    };
  }, [socket, handleChat, channelInfo, params]);

  return (
    <SideListItem>
      <NavLink to={`/workspace/${workspaceUrl}/channel/${channelName}`}>
        <HashIcon />
        {channelName}
        {<ChatBadge count={unreadsChatsCount || 0} />}
        {/* {unreadsChatsCount} */}
      </NavLink>
    </SideListItem>
  );
};

export default ChannelItem;
