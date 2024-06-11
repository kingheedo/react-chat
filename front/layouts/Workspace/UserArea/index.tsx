import SquareIcon from '@components/SquareIcon';
import useLogout from '@hooks/useMutate/useLogout';
import useGetUser from '@hooks/useSWR/useGetUser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import gravatar from 'gravatar';
import UserSquareIcon from '@components/UserSquareIcon';

const UserArea = () => {
  const navigate = useNavigate();
  const { user, getUser } = useGetUser();
  const { postLogOut } = useLogout();

  /** 로그아웃시
   *
   * 1. optimistic ui 적용
   * 2. 전역 상태 초기화 및 로컬 스토리지 초기화
   * 3. 로그인 페이지로 이동
   */
  const onClickLogout = async () => {
    try {
      await localStorage.setItem(
        'TokenStore',
        JSON.stringify({
          state: {
            accessToken: '',
            refreshToken: '',
          },
        })
      );
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    user && (
      <button onClick={() => onClickLogout()}>
        <UserSquareIcon email={user.email || ''} />
      </button>
    )
  );
};

export default UserArea;
