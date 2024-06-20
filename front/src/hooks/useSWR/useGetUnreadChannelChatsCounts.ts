import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';
import useGetUser from './useGetUser';

type GetUnreadsChatsCountReq = {
  workspaceUrl: string;
  channelName: string;
  after: number;
};

type GetUnreadsChatsCountRes = number;

const useGetUnreadChannelChatsCounts = ({
  workspaceUrl,
  channelName,
  after,
}: GetUnreadsChatsCountReq) => {
  const { data: unreadsChatsCount, mutate: mutateUnreadsChatsCount } =
    useSWR<GetUnreadsChatsCountRes>(
      `/api/workspaces/${workspaceUrl}/channels/${channelName}/chats/unread?after=${after}`,
      fetcher,
      {
        revalidateOnFocus: true,
      }
    );

  return {
    unreadsChatsCount,
    mutateUnreadsChatsCount,
  };
};

export default useGetUnreadChannelChatsCounts;
