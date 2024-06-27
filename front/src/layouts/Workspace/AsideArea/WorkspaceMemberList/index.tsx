import React, { useEffect, useMemo, useState } from 'react';
import SideListItem from '@components/SideListItem';
import useGetWorkspaceMembers, {
  GetWorkspaceMembers,
} from '@hooks/useSWR/useGetWorkSpaceMembers';
import { Link, useParams } from 'react-router-dom';
import UserSquareIcon from '@components/UserSquareIcon';
import useSocket from '@hooks/useSocket';
import OnlineStatusCircle from '@components/OnlineStatusCircle';
import { WorkspaceMemberContainer } from '../styles';
import MemberItem from './MemberItem';

export type WithOnlineMember = GetWorkspaceMembers & { online: boolean };

const WorkspaceMemberList = () => {
  const { workspaceMembers } = useGetWorkspaceMembers();
  const params = useParams();
  const { socket } = useSocket(params.workspaceUrl || '');
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const handleOnlineList = (list: any) => {
    setOnlineList(list);
  };

  useEffect(() => {
    socket?.on('onlineList', handleOnlineList);
  }, [socket]);

  useEffect(() => {
    return () => {
      socket?.connected && socket?.off('onlineList', handleOnlineList);
    };
  }, [params.workspace]);

  const withOnlineMembers: WithOnlineMember[] = useMemo(() => {
    let obj = new Map();

    workspaceMembers?.forEach((member) => {
      obj.set(member.id, {
        ...member,
        online: onlineList.includes(member.id),
      });
    });
    return Array.from(obj.values());
  }, [workspaceMembers, onlineList]);

  return (
    <WorkspaceMemberContainer>
      {withOnlineMembers?.map((workspaceMember) => (
        <MemberItem info={workspaceMember} />
      ))}
    </WorkspaceMemberContainer>
  );
};

export default WorkspaceMemberList;
