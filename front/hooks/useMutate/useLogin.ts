import request from '@apis/request';
import { mutate } from 'swr';

type PostLoginReq = {
  email: string;
  password: string;
};

type PostLoginRes = {
  id: number;
  nickname: string;
  email: string;
};

const useLoginApi = (payload: PostLoginReq) => {
  return request
    .post<PostLoginRes>('/api/users/login', payload)
    .then((res) => res.data);
};
const useLogIn = () => {
  const postLogin = (payload: PostLoginReq) =>
    mutate('postLogin', () => useLoginApi(payload));

  return {
    postLogin,
  };
};

export default useLogIn;
