import normalInstance from '@apis/normalInstance';
import { mutate } from 'swr';

type PostSignUpReq = {
  email: string;
  nickname: string;
  password: string;
};

const postSignUpApi = (payload: PostSignUpReq) => {
  return normalInstance.post('/api/users', payload).then((res) => res.data);
};
const useSignUp = () => {
  const postSignUp = (payload: PostSignUpReq) =>
    mutate('postSignUp', () => postSignUpApi(payload));

  return {
    postSignUp,
  };
};

export default useSignUp;
