import React, { useState } from 'react';
import { WorkspaceDetailWrap } from './styles';
import ChannelCreateBtn from './ChannelCreateBtn';
import ChannelCreateModal from './ChannelCreateModal';
import WorkspaceMemberList from './WorkspaceMemberList';
import ChannelList from './ChannelList';
import WorkspaceCaretBtn from './WorkspaceCaretBtn';

const AsideArea = () => {
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  /** 채널 생성하기 버튼 클릭 시 */
  const onClickAddChannelBtn = () => {
    setIsCreateChannelOpen(true);
  };

  /** 채널 생성 모달 닫기 */
  const handleChannelModalClose = () => {
    setIsCreateChannelOpen(false);
  };

  return (
    <aside>
      <WorkspaceDetailWrap>
        <WorkspaceCaretBtn />
        <ChannelList />
        <ChannelCreateBtn onClick={onClickAddChannelBtn} />
        <ChannelCreateModal
          isOpen={isCreateChannelOpen}
          handleClose={handleChannelModalClose}
        />
        <WorkspaceMemberList />
      </WorkspaceDetailWrap>
    </aside>
  );
};

export default AsideArea;
