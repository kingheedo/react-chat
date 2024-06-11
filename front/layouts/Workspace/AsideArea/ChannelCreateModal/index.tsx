import Form from '@components/Form';
import CenterModal from '@components/Modal/CenterModal';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import useInput from '@hooks/useInput';
import useCreateChannel from '@hooks/useMutate/useCreateChannel';
import useGetChannels from '@hooks/useSWR/useGetChannels';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IChannelCreateModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ChannelCreateModal = ({
  isOpen,
  handleClose,
}: IChannelCreateModalProps) => {
  const { value: channelName, onChangeInput: onChangeChannelName } = useInput({
    initValue: '',
  });

  const params = useParams();
  const currentWorkSpace = useCurrentWorkSpace();
  const { createChannel } = useCreateChannel();
  const { mutateGetChannel } = useGetChannels(params.workspaceUrl || '');

  /** 채널 생성 폼 제출 시  */
  const onSubmitCreaetChannel = async () => {
    if (!currentWorkSpace) {
      return;
    }

    try {
      await createChannel({
        workspaceNameParam: currentWorkSpace.name,
        data: {
          name: channelName,
        },
      });
      mutateGetChannel();
    } catch (err) {
      console.log('createChannelError', err);
    }
  };

  useEffect(() => {
    // url 파라미터가 변경될 때마다 채널 다시불러오기
    mutateGetChannel();
  }, [params]);

  return (
    <CenterModal isOpen={isOpen} handleClose={handleClose}>
      <CenterModal.CloseBtn />
      <CenterModal.Head>채널 생성</CenterModal.Head>
      <CenterModal.Body>
        <Form enabled={!!channelName} onSubmit={onSubmitCreaetChannel}>
          <Form.Label htmlFor="name" text="이름" />
          <Form.Input
            id="name"
            name="name"
            value={channelName}
            onChange={onChangeChannelName}
          />
          <button type="submit">생성</button>
        </Form>
      </CenterModal.Body>
    </CenterModal>
  );
};

export default ChannelCreateModal;
