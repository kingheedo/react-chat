import SquareIcon from '@components/SquareIcon';
import useLogout from '@hooks/useMutate/useLogout';
import useGetUser from '@hooks/useSWR/useGetUser';
import useUserStore from '@store/UserStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import gravatar from 'gravatar';
import UserSquareIcon from '@components/UserSquareIcon';

const UserArea = () => {
  const navigate = useNavigate();
  const { user, getUser } = useGetUser();
  const { setUserId } = useUserStore();
  const { postLogOut } = useLogout();

  /** 로그아웃시
   *
   * 1. optimistic ui 적용
   * 2. 전역 상태 초기화 및 로컬 스토리지 초기화
   * 3. 로그인 페이지로 이동
   */
  const onClickLogout = async () => {
    try {
      const getUserData = await getUser(await postLogOut(), {
        optimisticData: {
          id: -1,
          nickname: '',
          email: '',
          Workspaces: [],
        },
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });

      if (!getUserData?.id) {
        setUserId(-1);
      }
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
