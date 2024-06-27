import React from 'react';
import { Header } from '../styles';
import HashIcon from '@components/Icon/HashIcon';

interface IHeaderWrapProps {
  content: string;
}

const HeaderWrap = ({ content }: IHeaderWrapProps) => {
  return (
    <Header>
      <h2>
        <HashIcon />
        {content}
      </h2>
    </Header>
  );
};

export default HeaderWrap;
