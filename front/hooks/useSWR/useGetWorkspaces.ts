import request from '@apis/request';
import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

export type WorkSpace = {
  id: number;
  name: string;
  url: string;
  Members: {
    id: number;
    WorkspaceMember: {
      UserId: number;
    };
  }[];
};

const useGetWorkSpaceApi = () =>
  request.get<WorkSpace[]>('/api/workspaces').then((res) => res.data);

/** 워크스페이스 가져오기 */
const useGetWorkspaces = () => {
  const { data: workspaces, mutate: mutateGetWorkSpaces } = useSWR<WorkSpace[]>(
    location.pathname !== '/login' && location.pathname !== '/signup'
      ? '/api/workspaces'
      : null,
    fetcher
  );

  return { workspaces, mutateGetWorkSpaces };
};

export default useGetWorkspaces;
