import request from '@apis/request';
import { mutate } from 'swr';

type PostSignUp = {
  email: string;
  nickname: string;
  password: string;
};

const postSignUpApi = (payload: PostSignUp) => {
  return request.post('/api/users', payload).then((res) => res.data);
};
const useSignUp = (payload: PostSignUp) => {
  const postSignUp = () => mutate('postSignUp', () => postSignUpApi(payload));

  return {
    postSignUp,
  };
};

export default useSignUp;
