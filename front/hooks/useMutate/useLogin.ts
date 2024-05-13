import request from '@apis/request';
import { mutate } from 'swr';

type PostSignIn = {
  email: string;
  password: string;
};

const postSignInApi = (payload: PostSignIn) => {
  return request.post('/api/users/login', payload).then((res) => res.data);
};
const useSignIn = (payload: PostSignIn) => {
  const postSignIn = () => mutate('postSignIn', () => postSignInApi(payload));

  return {
    postSignIn,
  };
};

export default useSignIn;
