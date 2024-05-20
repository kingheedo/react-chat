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

type WithOnlineMember = GetWorkspaceMembers & { online: boolean };

const WorkspaceMemberList = () => {
  const { workspaceMembers } = useGetWorkspaceMembers();
  const params = useParams();
  const { socket } = useSocket(params.workspaceUrl || '');
  const [onlineList, setOnlineList] = useState<number[]>([]);

  useEffect(() => {
    socket?.on('onlineList', (list) => {
      setOnlineList(list);
    });
  }, [socket]);

  useEffect(() => {
    return () => {
      socket?.connected && socket?.off('onlineList');
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
        <SideListItem key={workspaceMember.id}>
          <Link
            to={`/workspace/${params.workspaceUrl}/dm/${workspaceMember.id}`}
          >
            {
              <UserSquareIcon email={workspaceMember?.email}>
                <OnlineStatusCircle active={workspaceMember.online} />
              </UserSquareIcon>
            }
            {workspaceMember?.nickname}
          </Link>
        </SideListItem>
      ))}
    </WorkspaceMemberContainer>
  );
};

export default WorkspaceMemberList;
