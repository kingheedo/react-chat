import React, { useState } from 'react';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import CaretDownIcon from '@components/Icon/CaretDownIcon';
import PopupModal from '@components/Modal/PopupModal';
import CenterModal from '@components/Modal/CenterModal';
import useInput from '@hooks/useInput';
import useInviteMember from '@hooks/useMutate/useInviteWorkSpaceMember';
import { useParams } from 'react-router-dom';
import useGetWorkspaceMembers from '@hooks/useSWR/useGetWorkSpaceMembers';
import { Head } from '../styles';
const popupTriggerBtns = [0];

const WorkspaceCaretBtn = () => {
  const parmas = useParams();
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
  const onClickInvite = async () => {
    if (!email) {
      return;
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
                <button>
                  <span>로그아웃</span>
                </button>
              </li>
            </ul>
          </PopupModal.Content>
        </PopupModal>
      </h2>
      <CenterModal isOpen={isInviteModalOpen} handleClose={handleInviteModal}>
        <CenterModal.CloseBtn />
        <CenterModal.Head>
          {currentWorkspace?.name}으로 사용자초대
        </CenterModal.Head>
        <CenterModal.Body>
          초대 받을 사람:
          <input
            value={email}
            onChange={onChangeEmail}
            type="text"
            placeholder="name@gmail.com"
          />
        </CenterModal.Body>
        <CenterModal.Footer>
          <button
            onClick={onClickInvite}
            className={email ? 'primary-btn active' : 'primary-btn'}
          >
            보내기
          </button>
        </CenterModal.Footer>
      </CenterModal>
    </Head>
  );
};

export default WorkspaceCaretBtn;
