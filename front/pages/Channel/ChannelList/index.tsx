import useGetChannels from '@hooks/useSWR/useGetChannels';
import React from 'react';
import { ChannelItem } from '../styles';
import { NavLink } from 'react-router-dom';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import HashIcon from '@components/Icon/HashIcon';

const ChannelList = () => {
  const { channels } = useGetChannels();
  const currentWorkSpace = useCurrentWorkSpace();

  return channels?.map((channel, channelIdx) => (
    <ChannelItem key={channel.id}>
      <NavLink
        to={`/workspace/${currentWorkSpace?.url}/channel/${channel.name}`}
      >
        <HashIcon />
        {channel.name}
      </NavLink>
    </ChannelItem>
  ));
};

export default ChannelList;
