import useGetChannels from '@hooks/useSWR/useGetChannels';
import React from 'react';
import { useParams } from 'react-router-dom';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import ChannelItem from './ChannelItem';

const ChannelList = () => {
  const params = useParams();
  const currentWorkSpace = useCurrentWorkSpace();
  const { channels } = useGetChannels(params.workspaceUrl || '');

  return channels?.map((channel) => (
    <ChannelItem
      key={channel.id}
      workspaceUrl={currentWorkSpace?.url || ''}
      channelName={channel.name}
    />
  ));
};

export default ChannelList;
