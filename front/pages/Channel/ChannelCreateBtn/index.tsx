import React from 'react';
import { Btn } from './styles';
import SquareIcon from '@components/SquareIcon';

interface IChannelCreateBtnProps {
  onClick: () => void;
}
const ChannelCreateBtn = ({ onClick }: IChannelCreateBtnProps) => {
  return (
    <Btn onClick={onClick}>
      <SquareIcon>+</SquareIcon>
      채널 추가
    </Btn>
  );
};

export default ChannelCreateBtn;
