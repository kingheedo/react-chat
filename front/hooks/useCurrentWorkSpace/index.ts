import { useParams } from 'react-router-dom';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';
import useGetUser from '@hooks/useSWR/useGetUser';
import { useMemo } from 'react';

/** 현재 url의 워크스페이스 이름 가져오기
 *
 * 1. params를 이용하여 가져오기
 *
 */
const useCurrentWorkSpace = () => {
  const params = useParams();
  const { user } = useGetUser();
  const { workspaces } = useGetWorkspaces();

  const currentWorkSpace = useMemo(() => {
    if (location.pathname === '/') {
      if (user && user.Workspaces[0]) {
        return user?.Workspaces[0];
      }
    } else {
      return workspaces?.find(
        (workspace) => workspace.url === params.workspaceUrl,
      );
    }
  }, [workspaces, params.workspaceUrl, user, location.pathname]);

  return currentWorkSpace;
};

export default useCurrentWorkSpace;
