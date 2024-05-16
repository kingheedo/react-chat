import React, { PropsWithChildren } from 'react';
import { BackDropArea } from './styles';

interface IBackDropProps {
  onClose: () => void;
}

const BackDrop = ({
  onClose,
  children,
}: IBackDropProps & PropsWithChildren) => {
  return <BackDropArea onClick={() => onClose()}>{children}</BackDropArea>;
};

export default BackDrop;
