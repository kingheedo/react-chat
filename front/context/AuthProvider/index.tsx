import useGetChannels from '@hooks/useSWR/useGetChannels';
import useGetUser from '@hooks/useSWR/useGetUser';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import useUserStore from '@store/UserStore';
import React, { PropsWithChildren, createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext<null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, error, isLoading } = useGetUser();
  const { userId, setUserId } = useUserStore();
  const { channels } = useGetChannels();
  const { workspaces } = useGetWorkspaces();

  useEffect(() => {
    if (error || (!user && !isLoading)) {
      setUserId(-1);
      useUserStore.persist.clearStorage();
    } else {
      if (user && user.id > -1 && !isLoading) {
        setUserId(user?.id);
      }
    }
  }, [error, user]);

  useEffect(() => {
    if (!isLoading && location.pathname !== '/signUp') {
      if ((user && user.id < 0) || userId < 0) {
        navigate('/login');
      } else {
        if (location.pathname === '/') {
          if (user && user.Workspaces[0] && channels && channels[0]) {
            navigate(
              `/workspace/${user.Workspaces[0].url}/channel/${channels[0].name}`,
            );
          }
        }
      }
    }
  }, [user, userId, location.pathname, isLoading, channels]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
