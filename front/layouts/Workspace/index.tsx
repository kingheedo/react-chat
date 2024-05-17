import React from 'react';
import { Outlet } from 'react-router-dom';
import { Section } from './styles';
import NavArea from './NavArea';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import UserArea from './UserArea';
import CurrentWorkSpace from './CurrentWorkSpace';

const Workspace = () => {
  const { workspaces } = useGetWorkspaces();

  return (
    <Section className="workspace">
      <header />
      <div className="content">
        <nav>
          <div className="top">
            <CurrentWorkSpace list={workspaces || []} />
            <NavArea />
          </div>
          <div className="bottom">
            <UserArea />
          </div>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </Section>
  );
};

export default Workspace;
