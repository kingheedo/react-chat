import React, { useState } from 'react';
import { ChannelWrap } from './styles';
import Chat from './Chat';
import ChannelList from './ChannelList';
import ChannelCreateModal from './ChannelCreateModal';
import ChannelCreateBtn from './ChannelCreateBtn';
import ChannelHead from './ChannelHead';

const Channel = () => {
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
    <React.Fragment>
      <ChannelWrap>
        <ChannelHead />
        <ChannelList />
        <ChannelCreateBtn onClick={onClickAddChannelBtn} />
        <ChannelCreateModal
          isOpen={isCreateChannelOpen}
          handleClose={handleChannelModalClose}
        />
      </ChannelWrap>
      <Chat />
    </React.Fragment>
  );
};

export default Channel;
