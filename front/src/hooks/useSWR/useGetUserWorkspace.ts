import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

type GetUserWorkspaceReq = {
  workspaceUrl: string;
  userId: string;
};

//특정 유저의 워크스페이스 정보
const useGetUserWorkspace = (payload: GetUserWorkspaceReq) => {
  const { data: userWorkspace } = useSWR<IUser>(
    payload.workspaceUrl && payload.userId
      ? `/api/workspaces/${payload.workspaceUrl}/users/${payload.userId}`
      : null,
    fetcher
  );

  return {
    userWorkspace,
  };
};

export default useGetUserWorkspace;
