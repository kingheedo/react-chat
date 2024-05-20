import request from '@apis/request';
import { IDM } from '@typings/db';
import useSWR from 'swr';

interface GetUserReq {
  params: { workspaceUrl: string; userId: string };
  query: { perPage: number; page: number };
}

const getDmsApi = ({ params, query }: GetUserReq) => {
  return request
    .get<
      IDM[]
    >(`/api/workspaces/${params.workspaceUrl}/dms/${params.userId}/chats?perPage=${query.perPage}&page=${query.page}`)
    .then((res) => res.data);
};
const useGetDms = ({ params, query }: GetUserReq) => {
  const {
    data: dms,
    mutate: getDms,
    error,
    isLoading,
    isValidating,
  } = useSWR('getDms', () => getDmsApi({ params, query }));

  return {
    dms,
    getDms,
    error,
    isLoading,
    isValidating,
  };
};

export default useGetDms;
