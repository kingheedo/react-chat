import React, { useState } from 'react';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import CaretDownIcon from '@components/Icon/CaretDownIcon';
import PopupModal from '@components/Modal/PopupModal';
import CenterModal from '@components/Modal/CenterModal';
import useInput from '@hooks/useInput';
import useInviteMember from '@hooks/useMutate/useInviteWorkSpaceMember';
import { useNavigate, useParams } from 'react-router-dom';
import useGetWorkspaceMembers from '@hooks/useSWR/useGetWorkSpaceMembers';
import { Head } from '../styles';
import { InviteModalWrap } from './styles';
import useLogout from '@hooks/useMutate/useLogout';
const popupTriggerBtns = [0];

const WorkspaceCaretBtn = () => {
  const parmas = useParams();
  const navigate = useNavigate();
  const currentWorkspace = useCurrentWorkSpace();
  const { getWorkspaceMembers } = useGetWorkspaceMembers();
  const [popupIdx, setPopupIdx] = useState(-1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { value: email, onChangeInput: onChangeEmail } = useInput({
    initValue: '',
  });
  const { postInviteWorkSpaceMember } = useInviteMember();
  const handleInviteModal = () => {
    setPopupIdx(-1);
    setIsInviteModalOpen((prev) => !prev);
  };

  /** 초대 보내기 */
  const onSubmitInvite = async () => {
    if (!email) {
      return alert('이메일을 입력해주세요.');
    }
    try {
      await postInviteWorkSpaceMember({
        email,
        workspaceUrl: parmas.workspaceUrl || '',
      });
      await getWorkspaceMembers();
      setIsInviteModalOpen(false);
    } catch (err) {
      console.log(err);
      alert('사용자 초대에 실패하였습니다.');
    }
  };

  const { postLogOut } = useLogout();

  /** 로그아웃시
   *
   * 1. optimistic ui 적용
   * 2. 전역 상태 초기화 및 로컬 스토리지 초기화
   * 3. 로그인 페이지로 이동
   */
  const onClickLogout = async () => {
    try {
      await postLogOut();
      localStorage.setItem(
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
    <Head>
      <h2>
        <PopupModal
          as="click"
          openIdx={popupIdx}
          handlePopupIdx={(idx: number) => setPopupIdx(idx)}
        >
          {popupTriggerBtns.map((btn, btnIdx) => (
            <PopupModal.Trigger key={btnIdx} idx={btnIdx}>
              <button>
                {currentWorkspace?.name}
                <CaretDownIcon />
              </button>
            </PopupModal.Trigger>
          ))}
          <PopupModal.Content>
            <ul>
              <li>{currentWorkspace?.name}</li>
              <li>
                <button onClick={handleInviteModal}>
                  <span>{currentWorkspace?.name}팀으로 사용자 초대</span>
                </button>
              </li>
              <li>
                <button onClick={() => onClickLogout()}>
                  <span>로그아웃</span>
                </button>
              </li>
            </ul>
          </PopupModal.Content>
        </PopupModal>
      </h2>
      <InviteModalWrap>
        <CenterModal isOpen={isInviteModalOpen} handleClose={handleInviteModal}>
          <CenterModal.CloseBtn />
          <CenterModal.Head>
            {currentWorkspace?.name}(으)로 사용자초대
          </CenterModal.Head>
          <CenterModal.Body>
            <span>초대 받을 사람:</span>
            <form onSubmit={onSubmitInvite}>
              <input
                value={email}
                onChange={onChangeEmail}
                type="text"
                placeholder="name@gmail.com"
              />
            </form>
          </CenterModal.Body>
          <CenterModal.Footer>
            <CenterModal.FooterBtn type="submit" active={!!email}>
              보내기
            </CenterModal.FooterBtn>
          </CenterModal.Footer>
        </CenterModal>
      </InviteModalWrap>
    </Head>
  );
};

export default WorkspaceCaretBtn;
