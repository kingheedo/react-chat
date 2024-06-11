import React, { useEffect, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Section } from './styles';
import NavArea from './NavArea';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import UserArea from './UserArea';
import CurrentWorkSpace from './CurrentWorkSpace';
import useSocket from '@hooks/useSocket';
import useGetChannels from '@hooks/useSWR/useGetChannels';
import AsideArea from './AsideArea';
import useGetUser from '@hooks/useSWR/useGetUser';

const Workspace = () => {
  const params = useParams();
  const { user, getUser } = useGetUser();
  const { workspaces } = useGetWorkspaces();
  const { channels } = useGetChannels(params.workspaceUrl || '');
  const { socket, disconnect } = useSocket(params.workspaceUrl || '');

  useEffect(() => {
    if (user && channels) {
      socket?.emit('login', {
        id: user.id,
        channels: channels.map((channel) => channel.id),
      });
    }
  }, [user && user.id, channels]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [params.workspaceUrl]);

  const workspaceList = useMemo(() => {
    return (
      workspaces?.filter((workspace) => {
        return workspace.Workspacemembers.some(
          (member) => member.UserId === user?.id
        );
      }) || []
    );
  }, [workspaces, user?.id]);

  return (
    <Section className="workspace">
      <header />
      <div className="content">
        <nav>
          <div className="top">
            <CurrentWorkSpace list={workspaceList} />
            <NavArea />
          </div>
          <div className="bottom">
            <UserArea />
          </div>
        </nav>
        <AsideArea />
        <main>
          <Outlet />
        </main>
      </div>
    </Section>
  );
};

export default Workspace;
