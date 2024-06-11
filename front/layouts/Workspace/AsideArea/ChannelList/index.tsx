import useGetChannels from '@hooks/useSWR/useGetChannels';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';
import HashIcon from '@components/Icon/HashIcon';
import SidListItem from '@components/SideListItem';

const ChannelList = () => {
  const params = useParams();
  const currentWorkSpace = useCurrentWorkSpace();
  const { channels } = useGetChannels(params.workspaceUrl || '');

  return channels?.map((channel, channelIdx) => (
    <SidListItem key={channel.id}>
      <NavLink
        to={`/workspace/${currentWorkSpace?.url}/channel/${channel.name}`}
      >
        <HashIcon />
        {channel.name}
      </NavLink>
    </SidListItem>
  ));
};

export default ChannelList;
