import useSendDm from '@hooks/useMutate/useSendDm';
import useGetDms from '@hooks/useSWR/useGetDms';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from './styles';
import ChatArea, { Role } from '@components/ChatArea';
import useSocket from '@hooks/useSocket';
import useGetUser from '@hooks/useSWR/useGetUser';
import { IDM } from '@typings/db';
import useGetUserWorkspace from '@hooks/useSWR/useGetUserWorkspace';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';

const DirectMessage = () => {
  const params = useParams();
  const { user, isLoading: isLoadingUser } = useGetUser();
  const { postSendDm } = useSendDm();
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
      await postSendDm({
        params: {
          workspaceUrl: params.workspaceUrl || '',
          userId: params.userId || '',
        },
        body: {
          content,
        },
      });

      let prevDms = dms as any;
      prevDms = [
        [
          {
            id: dms && dms[0][0] ? dms[0][0].id + 1 : 1,
            Receiver: {
              nickname: userWorkspace?.nickname,
              id: userWorkspace?.id,
              email: userWorkspace?.email,
            },
            ReceiverId: Number(params.userId),
            Sender: {
              nickname: user?.nickname,
              id: user?.id,
              email: user?.email,
            },
            SenderId: user?.id,
            WorkspaceId: currentWorkspace?.id,
            content: content,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...prevDms[0],
        ],
      ];
      await mutateDms(prevDms, false);
      scrollbarRef.current?.scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

  const handleListenDm = async (data: any) => {
    let prevDms = dms as any;
    prevDms = [
      [
        {
          id: prevDms[0][0].id,
          Receiver: {
            nickname: userWorkspace?.nickname,
            id: userWorkspace?.id,
            email: userWorkspace?.email,
          },
          ReceiverId: userWorkspace?.id,
          Sender: {
            nickname: data.Sender.nickname,
            id: data.Sender.id,
            email: data.Sender.email,
          },
          SenderId: data.SenderId,
          WorkspaceId: data.WorkspaceId,
          content: data.content,
          createdAt: data.createdAt,
          updatedAt: data.createdAt,
        },
        ...prevDms[0],
      ],
    ];
    console.log('prevDms', prevDms);

    await mutateDms(prevDms, false);
  };

  useEffect(() => {
    socket?.on('dm', handleListenDm);

    return () => {
      socket?.off('dm', handleListenDm);
    };
  }, [socket, dms, userWorkspace]);

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
