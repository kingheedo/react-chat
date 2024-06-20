import authInstance from '@apis/authInstance';
import React from 'react';
import { mutate } from 'swr';

const postLogoutApi = () => {
  return authInstance.post('/api/users/logout').then((res) => res.data);
};

const useLogout = () => {
  const postLogOut = () => mutate('postLogOut', () => postLogoutApi());
  return {
    postLogOut,
  };
};

export default useLogout;
