import request from '@apis/request';
import useGetUser from '@hooks/useSWR/useGetUser';
import useUserStore from '@store/UserStore';
import React, { PropsWithChildren, createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext<null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, error, isLoading, isValidating } = useGetUser();
  const { userId, setUserId } = useUserStore();

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
        navigate('/workspace/channel');
      }
    }
  }, [user, userId, location.pathname, isLoading]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
