import SquareIcon from '@components/SquareIcon';
import React, { useState } from 'react';
import { SpaceContainer } from './styles';
import PopupModal from '@components/Modal/PopupModal';
import CenterModal from '@components/Modal/CenterModal';
import Form from '@components/Form';
import useInput from '@hooks/useInput';
import useCreateWorkSpace from '@hooks/useMutate/useCreateWorkSpace';
import useGetWorkspaces, { WorkSpace } from '@hooks/useSWR/useGetWorkspaces';
import { useNavigate } from 'react-router-dom';
import MyWorkSpaceList from './MyWorkSpaceList';

interface ISpaceListProps {
  list: WorkSpace[];
}

const PopupTriggerBtns = [0];

const MainSpace = ({ list }: ISpaceListProps) => {
  const [popupIdx, setPopupIdx] = useState(-1);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
  const { value: name, onChangeInput: onChangeName } = useInput({
    initValue: '',
  });
  const { value: url, onChangeInput: onChangeUrl } = useInput({
    initValue: '',
  });

  const { postCreateWorkSpace } = useCreateWorkSpace();
  const { mutateGetWorkSpaces } = useGetWorkspaces();

  const navigate = useNavigate();

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
    console.log('워크스페이스 생성하기');
    const res = await postCreateWorkSpace({
      workspace: name,
      url: url,
    });
    mutateGetWorkSpaces();
    // console.log('res', res);
    setIsCenterModalOpen(false);
  };

  console.log('list', list);

  return (
    <SpaceContainer>
      <PopupModal
        listLength={PopupTriggerBtns.length}
        openIdx={popupIdx}
        handlePopupIdx={(idx: number) => setPopupIdx(idx)}
      >
        <PopupModal.Trigger>
          <PopupTriggerBtn />
        </PopupModal.Trigger>
        <PopupModal.Content>
          <MyWorkSpaceList
            list={list}
            onClickAddWorkSpaceBtn={onClickAddWorkSpaceBtn}
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

const PopupTriggerBtn = () => {
  return (
    <button>
      <SquareIcon>H</SquareIcon>
    </button>
  );
};

export default MainSpace;
