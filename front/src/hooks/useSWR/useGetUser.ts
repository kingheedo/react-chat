import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type GetUserRes = {
  id: number;
  nickname: string;
  email: string;
};

//나의 정보
const useGetUser = () => {
  const {
    data: user,
    mutate: getUser,
    error,
    isLoading,
    isValidating,
  } = useSWR<GetUserRes>('/api/users', fetcher);

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
