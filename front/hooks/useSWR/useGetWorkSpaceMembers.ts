import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

type GetWorkspaceMembersReq = string;

export type GetWorkspaceMembers = {
  id: number;
  nickname: string;
  email: string;
};

const useGetWorkspaceMembers = () => {
  const currentWorkSpace = useCurrentWorkSpace();

  const { data: workspaceMembers, mutate: getWorkspaceMembers } = useSWR<
    GetWorkspaceMembers[]
  >(
    currentWorkSpace?.url
      ? `/api/workspaces/${currentWorkSpace?.url}/members`
      : null,
    fetcher
  );

  return {
    workspaceMembers,
    getWorkspaceMembers,
  };
};

export default useGetWorkspaceMembers;
