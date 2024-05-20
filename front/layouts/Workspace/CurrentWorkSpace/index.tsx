import SquareIcon from '@components/SquareIcon';
import React, { useState } from 'react';
import { SpaceContainer } from './styles';
import PopupModal from '@components/Modal/PopupModal';
import CenterModal from '@components/Modal/CenterModal';
import Form from '@components/Form';
import useInput from '@hooks/useInput';
import useCreateWorkSpace from '@hooks/useMutate/useCreateWorkSpace';
import useGetWorkspaces, { WorkSpace } from '@hooks/useSWR/useGetWorkspaces';
import MyWorkSpaceList from './MyWorkSpaceList';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';

interface ISpaceListProps {
  list: WorkSpace[];
}

const popupTriggerBtns = [0];

const CurrentWorkSpace = ({ list }: ISpaceListProps) => {
  const [popupIdx, setPopupIdx] = useState(-1);
  const [curWorkSpaceIdx, setCurWorkSpaceIdx] = useState(0);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const { value: name, onChangeInput: onChangeName } = useInput({
    initValue: '',
  });
  const { value: url, onChangeInput: onChangeUrl } = useInput({
    initValue: '',
  });

  const { postCreateWorkSpace } = useCreateWorkSpace();
  const { mutateGetWorkSpaces } = useGetWorkspaces();
  const currentWorkSpace = useCurrentWorkSpace();

  /** 선택한 워크스페이스의 인덱스 */
  const handleCurWorkSpaceIdx = (idx: number) => {
    setCurWorkSpaceIdx(idx);
  };

  /** 워크스페이스 추가하기 버튼 클릭 시
   *
   * 1. 센터모달 오픈
   * 2. 팝업 인덱스 -1로 하여 닫기
   */
  const onClickAddWorkSpaceBtn = () => {
    setIsCenterModalOpen(true);
    setPopupIdx(-1);
  };

  /** 워크스페이스 생성하기 */
  const onSumbitAddWorkSpace = async () => {
    await postCreateWorkSpace({
      workspace: name,
      url: url,
    });
    mutateGetWorkSpaces();
    setIsCenterModalOpen(false);
  };

  return (
    <SpaceContainer>
      <PopupModal
        as="hover"
        openIdx={popupIdx}
        handlePopupIdx={(idx: number) => setPopupIdx(idx)}
      >
        {popupTriggerBtns.map((btn, btnIdx) => (
          <PopupModal.Trigger key={btnIdx} idx={btnIdx}>
            {currentWorkSpace && (
              <PopupTriggerBtn workspaceName={currentWorkSpace.name} />
            )}
          </PopupModal.Trigger>
        ))}
        <PopupModal.Content>
          <MyWorkSpaceList
            list={list}
            onClickAddWorkSpaceBtn={onClickAddWorkSpaceBtn}
            curWorkSpace={{
              idx: curWorkSpaceIdx,
              handleIdx: handleCurWorkSpaceIdx,
            }}
          />
        </PopupModal.Content>
      </PopupModal>
      <CenterModal
        isOpen={isCenterModalOpen}
        handleClose={() => setIsCenterModalOpen(false)}
      >
        <CenterModal.CloseBtn />
        <CenterModal.Head>워크스페이스 추가</CenterModal.Head>
        <CenterModal.Body>
          <Form enabled={!!(name && url)} onSubmit={onSumbitAddWorkSpace}>
            <Form.Label htmlFor="name" text="워크스페이스 이름" />
            <Form.Input value={name} onChange={onChangeName} />

            <Form.Label htmlFor="url" text="워크스페이스 url" />
            <Form.Input value={url} onChange={onChangeUrl} />
            <Form.SubmitBtn>생성하기</Form.SubmitBtn>
          </Form>
        </CenterModal.Body>
      </CenterModal>
    </SpaceContainer>
  );
};

interface IPopupTriggerBtnProps {
  workspaceName: string;
}

const PopupTriggerBtn = ({ workspaceName }: IPopupTriggerBtnProps) => {
  return (
    <button>
      <SquareIcon>{workspaceName[0]}</SquareIcon>
    </button>
  );
};

export default CurrentWorkSpace;
