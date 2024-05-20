import useGetChannels from '@hooks/useSWR/useGetChannels';
import useGetUser from '@hooks/useSWR/useGetUser';
import useUserStore from '@store/UserStore';
import React, { ComponentType, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IWithAuthProps {}

const withAuth = <P extends IWithAuthProps>(Component: ComponentType<P>) => {
  const withAuthCheck = (props: P) => {
    const { user, isLoading } = useGetUser();
    const { userId } = useUserStore();
    const { channels } = useGetChannels();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') {
        if (userId < 0) {
          navigate('/login');
        } else if (user && user.Workspaces[0] && channels && channels[0]) {
          navigate(
            `/workspace/${user.Workspaces[0].url}/channel/${channels[0].name}`,
          );
        }
      }
    }, [location.pathname, userId, user, channels]);

    useEffect(() => {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        if (userId >= 0) {
          navigate('/');
        }
      }
    }, [location.pathname, userId]);

    return <Component {...props} />;
  };
  return withAuthCheck;
};

export default withAuth;
