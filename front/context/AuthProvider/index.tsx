import request from '@apis/request';
import useGetUser from '@hooks/useSWR/useGetUser';
import useUserStore from '@store/UserStore';
import React, { PropsWithChildren, createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext<null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useGetUser();
  const { userId, setUserId } = useUserStore();

  useEffect(() => {
    if (error) {
      setUserId(-1);
      useUserStore.persist.clearStorage();
    }
  }, [error]);

  useEffect(() => {
    if (location.pathname === '/login' && userId >= 0) {
      navigate('/');
    } else if (location.pathname !== '/login' && userId < 0) {
      navigate('/login');
    }
  }, [userId, location.pathname]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
