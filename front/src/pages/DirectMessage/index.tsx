import useSendDm from '@hooks/useMutate/useSendDm';
import useGetDms from '@hooks/useSWR/useGetDms';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from './styles';
import ChatArea, { Role } from '@components/ChatArea';
import useSocket from '@hooks/useSocket';
import useGetUser from '@hooks/useSWR/useGetUser';
import { IDM } from '@typings/db';
import useGetUserWorkspace from '@hooks/useSWR/useGetUserWorkspace';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import useUnreadsDateStore from '@store/UnreadsDateStore';

const DirectMessage = () => {
  const params = useParams();
  const { user } = useGetUser();
  const { postSendDm } = useSendDm();
  const { setUnreadsDate } = useUnreadsDateStore();
  const currentWorkspace = useCurrentWorkSpace();
  const { userWorkspace } = useGetUserWorkspace({
    workspaceUrl: params.workspaceUrl || '',
    userId: params.userId || '',
  });

  const { dms, mutateDms, isLoading, isLastData, size, setSize, scrollbarRef } =
    useGetDms({
      params: {
        workspaceUrl: params.workspaceUrl || '',
        userId: params.userId || '',
      },
    });

  const { socket, disconnect } = useSocket(params.workspaceUrl || '');

  const handleUpdate = async () => {
    await setSize((prev) => prev + 1);
  };

  /** dm 채팅 보내기 */
  const handleSubmit = async (content: string) => {
    if (!content) {
      return;
    }
    try {
      const returnedDm: IDM = await postSendDm({
        params: {
          workspaceUrl: params.workspaceUrl || '',
          userId: params.userId || '',
        },
        body: {
          content,
        },
      });

      let prevDms = dms as any;
      let newDms;
      newDms = [
        [
          {
            id: returnedDm.id,
            Receiver: {
              nickname: returnedDm.Receiver.nickname,
              id: returnedDm.Receiver.id,
              email: returnedDm.Receiver.email,
            },
            ReceiverId: Number(params.userId),
            Sender: {
              nickname: returnedDm.Sender.nickname,
              id: returnedDm.Sender.id,
              email: returnedDm.Sender.email,
            },
            SenderId: returnedDm.Sender.id,
            WorkspaceId: currentWorkspace?.id,
            content: returnedDm.content,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...prevDms[0],
        ],
      ];
      await mutateDms(newDms, false);

      await socket?.emit('clientDm', returnedDm);
      setUnreadsDate(
        `${params.workspaceUrl}-${returnedDm.ReceiverId}`,
        String(new Date().getTime())
      );
      scrollbarRef.current?.scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

  const handleListenDm = async (data: IDM) => {
    let prevDms = dms as any;
    if (data.SenderId !== user?.id && Number(params.userId) === data.SenderId) {
      let newDms;
      newDms = [
        [
          {
            id: data.id,
            Receiver: {
              nickname: data.Receiver.nickname,
              id: data.Receiver.id,
              email: data.Receiver.email,
            },
            ReceiverId: Number(params.userId),
            Sender: {
              nickname: data.Sender.nickname,
              id: data.Sender.id,
              email: data.Sender.email,
            },
            SenderId: data.Sender.id,
            WorkspaceId: currentWorkspace?.id,
            content: data.content,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...prevDms[0],
        ],
      ];
      await mutateDms(newDms, false);
    }
  };

  useEffect(() => {
    socket?.on('dm', handleListenDm);

    return () => {
      socket?.off('dm', handleListenDm);
    };
  }, [socket, dms, userWorkspace]);

  useEffect(() => {
    setUnreadsDate(
      `${params.workspaceUrl}-${params.userId}`,
      String(new Date().getTime())
    );
  }, [params]);

  return (
    <Section className="dm">
      <ChatArea
        role={Role.DM}
        list={dms || []}
        isLastData={isLastData}
        isLoading={isLoading}
        scrollbarRef={scrollbarRef}
        handleUpdate={handleUpdate}
        handleSubmit={handleSubmit}
      />
    </Section>
  );
};

export default DirectMessage;
