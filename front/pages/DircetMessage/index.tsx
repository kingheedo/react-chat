import Chat from '@components/ChatArea';
import useSendDm from '@hooks/useMutate/useSendDm';
import useGetDms from '@hooks/useSWR/useGetDms';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from './styles';
import ChatArea from '@components/ChatArea';

const DirectMessage = () => {
  const params = useParams();
  const { dms, getDms } = useGetDms({
    params: {
      workspaceUrl: params.workspaceUrl || '',
      userId: params.userId || '',
    },
    query: {
      perPage: 20,
      page: 1,
    },
  });
  const { postSendDm } = useSendDm();
  /** dm 채팅 보내기 */
  const handleSubmit = async (content: string) => {
    if (!content) {
      return;
    }
    try {
      await postSendDm({
        params: {
          workspaceUrl: params.workspaceUrl || '',
          userId: params.userId || '',
        },
        body: {
          content,
        },
      });
      await getDms();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Section className="dm">
      <ChatArea list={dms || []} handleSubmit={handleSubmit} />
    </Section>
  );
};

export default DirectMessage;
