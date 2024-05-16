import request from '@apis/request';
import useSWR from 'swr';

type GetUserRes = {
  id: number;
  nickname: string;
  email: string;
};

const getUserApi = () => {
  return request.get<GetUserRes>('/api/users').then((res) => res.data);
};
const useGetUser = () => {
  const {
    data: user,
    mutate: getUser,
    error,
    isLoading,
    isValidating,
  } = useSWR('getUser', () => getUserApi());

  return {
    id: user?.id || -1,
    user,
    getUser,
    error,
    isLoading,
    isValidating,
  };
};

export default useGetUser;
