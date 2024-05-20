import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Section } from './styles';
import NavArea from './NavArea';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import UserArea from './UserArea';
import CurrentWorkSpace from './CurrentWorkSpace';
import useSocket from '@hooks/useSocket';
import useGetChannels from '@hooks/useSWR/useGetChannels';
import useUserStore from '@store/UserStore';
import AsideArea from './AsideArea';
import useGetUser from '@hooks/useSWR/useGetUser';

const Workspace = () => {
  const params = useParams();
  const { workspaces } = useGetWorkspaces();
  const { channels } = useGetChannels();
  const { userId } = useUserStore();
  const { user } = useGetUser();
  const { socket, disconnect } = useSocket(params.workspaceUrl || '');

  useEffect(() => {
    if (userId && channels) {
      socket?.emit('login', {
        id: userId,
        channels: channels.map((channel) => channel.id),
      });
    }
  }, [userId, channels, socket]);

  useEffect(() => {
    return () => {
      socket?.connected && socket?.disconnect();
    };
  }, [params.workspace]);

  return (
    <Section className="workspace">
      <header />
      <div className="content">
        <nav>
          <div className="top">
            <CurrentWorkSpace
              list={
                workspaces?.filter((workspace) =>
                  workspace.Members.map((member) => member.id).includes(userId),
                ) || []
              }
            />
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
