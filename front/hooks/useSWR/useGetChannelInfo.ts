import { IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react';
import useSWR from 'swr';

type GetChannelsInfo = {
  channelName: string;
  workspaceUrl: string;
};

/** 채널의 정보 */
const useGetChannelInfo = ({ channelName, workspaceUrl }: GetChannelsInfo) => {
  const { data: channelInfo } = useSWR<IChannel>(
    `/api/workspaces/${workspaceUrl}/channels/${encodeURIComponent(channelName)}`,
    fetcher
  );

  return {
    channelInfo,
  };
};

export default useGetChannelInfo;
