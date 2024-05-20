import request from '@apis/request';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

type GetWorkspaceMembersReq = string;

export type GetWorkspaceMembers = {
  id: number;
  nickname: string;
  email: string;
};

const getWorkspaceMembersApi = (workspaceUrl: GetWorkspaceMembersReq) => {
  return request
    .get<GetWorkspaceMembers[]>(`/api/workspaces/${workspaceUrl}/members`)
    .then((res) => res.data);
};
const useGetWorkspaceMembers = () => {
  const currentWorkSpace = useCurrentWorkSpace();

  const { data: workspaceMembers, mutate: getWorkspaceMembers } = useSWR(
    currentWorkSpace?.url
      ? 'getWorkspaceMembers' + currentWorkSpace?.url
      : null,
    () => getWorkspaceMembersApi(currentWorkSpace?.url || ''),
  );

  return {
    workspaceMembers,
    getWorkspaceMembers,
  };
};

export default useGetWorkspaceMembers;
