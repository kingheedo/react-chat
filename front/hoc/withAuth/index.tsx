import { IToken } from '@apis/authInstance';
import useGetUser from '@hooks/useSWR/useGetUser';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import React, { ComponentType, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IWithAuthProps {}

const withAuth = <P extends IWithAuthProps>(Component: ComponentType<P>) => {
  const withAuthCheck = (props: P) => {
    const { user } = useGetUser();
    const { workspaces, mutateGetWorkSpaces } = useGetWorkspaces();
    const navigate = useNavigate();
    const location = useLocation();
    const tokens = localStorage.getItem('TokenStore')
      ? (JSON.parse(localStorage.getItem('TokenStore') || '').state as IToken)
      : null;

    const handler = async () => {
      if (
        tokens &&
        tokens.accessToken &&
        tokens.refreshToken &&
        location.pathname === '/'
      ) {
        await mutateGetWorkSpaces();
        if (workspaces && workspaces[0].url) {
          return navigate(
            `/workspace/${workspaces && workspaces[0].url}/channel/일반`
          );
        }
      } else if (tokens && tokens.accessToken && tokens.refreshToken) {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          return navigate('/');
        }
      } else if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          return navigate('/login');
        }
      }
    };

    useEffect(() => {
      handler();
    }),
      [location.pathname, user, workspaces, tokens];

    return <Component {...props} />;
  };
  return withAuthCheck;
};

export default withAuth;
