import React from 'react';
import { ChCreateBtn } from '../styles';
import SquareIcon from '@components/SquareIcon';

interface IChannelCreateBtnProps {
  onClick: () => void;
}
const ChannelCreateBtn = ({ onClick }: IChannelCreateBtnProps) => {
  return (
    <ChCreateBtn onClick={onClick}>
      <SquareIcon>+</SquareIcon>
      채널 추가
    </ChCreateBtn>
  );
};

export default ChannelCreateBtn;
