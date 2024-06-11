import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

export type WorkSpace = {
  id: number;
  name: string;
  url: string;
  Workspacemembers: {
    UserId: number;
  }[];
};

/** 워크스페이스 가져오기 */
const useGetWorkspaces = () => {
  const {
    data: workspaces,
    isLoading,
    mutate: mutateGetWorkSpaces,
  } = useSWR<WorkSpace[]>('/api/workspaces', fetcher);

  return { workspaces, isLoading, mutateGetWorkSpaces };
};

export default useGetWorkspaces;
