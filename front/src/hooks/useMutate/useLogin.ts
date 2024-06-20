import normalInstance from '@apis/normalInstance';
import axios from 'axios';
import { mutate } from 'swr';

type PostLoginReq = {
  email: string;
  password: string;
};

type PostLoginRes = {
  accessToken: string;
  refreshToken: string;
};

const useLoginApi = (payload: PostLoginReq) => {
  return normalInstance
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
