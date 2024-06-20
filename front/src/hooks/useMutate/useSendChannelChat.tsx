import authInstance from '@apis/authInstance';
import React from 'react';
import { mutate } from 'swr';

export type SendChannelChatReq = {
  workspaceUrl: string;
  channelName: string;
  data: {
    content: string;
  };
};

const sendChannelApi = (payload: SendChannelChatReq) => {
  return authInstance
    .post(
      `/api/workspaces/${payload.workspaceUrl}/channels/${payload.channelName}/chats`,
      payload.data
    )
    .then((res) => res.data);
};

/** 채널 채팅 보내기 */
const useSendChannelChat = () => {
  const sendChannelChat = (payload: SendChannelChatReq) =>
    mutate('sendChannel', () => sendChannelApi(payload));

  return {
    sendChannelChat,
  };
};

export default useSendChannelChat;
