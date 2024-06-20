import React from 'react';
import { Header } from '../styles';
import HashIcon from '@components/Icon/HashIcon';

const HeaderWrap = () => {
  return (
    <Header>
      <h2>
        <HashIcon />
        랜덤
      </h2>
    </Header>
  );
};

export default HeaderWrap;
