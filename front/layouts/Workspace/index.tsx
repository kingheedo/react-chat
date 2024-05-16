import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Section } from './styles';
import SquareIcon from '@components/SquareIcon';
import useLogout from '@hooks/useMutate/useLogout';
import useUserStore from '@store/UserStore';
import useGetUser from '@hooks/useSWR/useGetUser';
import NavLinks from './NavLinks';
import SpaceList from './MainSpace';
import useGetWorkspaces from '@hooks/useSWR/useGetWorkspaces';

const Workspace = () => {
  const { postLogOut } = useLogout();
  const { getUser } = useGetUser();
  const { setUserId } = useUserStore();
  const navigate = useNavigate();
  const { workspaces } = useGetWorkspaces();

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
        },
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });

      if (!getUserData?.id) {
        setUserId(-1);
        useUserStore.persist.clearStorage();
      }
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Section className="workspace">
      <header>헤더</header>
      <div className="content">
        <nav>
          <div className="top">
            <SpaceList list={workspaces || []} />
            <NavLinks />
          </div>
          <div className="bottom">
            <button onClick={() => onClickLogout()}>
              <SquareIcon>나</SquareIcon>
            </button>
          </div>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </Section>
  );
};

export default Workspace;
