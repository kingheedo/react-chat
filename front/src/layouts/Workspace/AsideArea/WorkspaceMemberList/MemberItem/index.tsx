import OnlineStatusCircle from '@components/OnlineStatusCircle';
import SideListItem from '@components/SideListItem';
import UserSquareIcon from '@components/UserSquareIcon';
import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WithOnlineMember } from '..';
import useGetUnreadDmCounts from '@hooks/useSWR/useGetUnreadDmCounts';
import useUnreadsDateStore from '@store/UnreadsDateStore';
import ChatBadge from '@components/ChatBadge';
import useSocket from '@hooks/useSocket';
import { IDM } from '@typings/db';

interface IMemberItemProps {
  info: WithOnlineMember;
}

const MemberItem = ({ info }: IMemberItemProps) => {
  const params = useParams();
  const { unreadsDate, setUnreadsDate } = useUnreadsDateStore();
  const { socket } = useSocket(params.workspaceUrl || '');

  const getUnreadsDate = useMemo(() => {
    const targetIdx = unreadsDate.findIndex(
      (unread) => unread[`${params.workspaceUrl}-${info.id}`]
    );
    if (targetIdx > -1) {
      return Number(
        unreadsDate[targetIdx][`${params.workspaceUrl}-${info.id}`]
      );
    } else {
      return 0;
    }
  }, [params, info, unreadsDate]);

  const { unreadsDmsCounts, mutateUnreadsDmsCounts } = useGetUnreadDmCounts({
    workspaceUrl: params.workspaceUrl || '',
    receiverId: info.id,
    after: getUnreadsDate,
  });

  const handleDm = (dm: IDM) => {
    if (info.id === dm.SenderId && dm.SenderId !== dm.ReceiverId) {
      mutateUnreadsDmsCounts();
    }
  };

  const handleFocus = () => {
    if (info.id === Number(params.userId)) {
      setUnreadsDate(
        `${params.workspaceUrl}-${params.userId}`,
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
  }, [params, info.id]);

  useEffect(() => {
    socket?.on('dm', handleDm);

    return () => {
      socket?.off('dm', handleDm);
    };
  }, []);

  return (
    <SideListItem key={info.id}>
      <Link to={`/workspace/${params.workspaceUrl}/dm/${info.id}`}>
        <UserSquareIcon email={info?.email}>
          <OnlineStatusCircle active={info.online} />
        </UserSquareIcon>

        {info?.nickname}
        {<ChatBadge count={unreadsDmsCounts} />}
      </Link>
    </SideListItem>
  );
};

export default MemberItem;
