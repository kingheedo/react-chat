import React from 'react';
import { Head } from './styles';
import useCurrentWorkSpace from '@hooks/useCurrentWorkSpace';

const ChannelHead = () => {
  const currentWorkspace = useCurrentWorkSpace();
  return (
    <Head>
      <h2>{currentWorkspace?.name}</h2>
    </Head>
  );
};

export default ChannelHead;
