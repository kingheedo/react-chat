import React, { PropsWithChildren } from 'react';
import { BackDropArea } from './styles';

interface IBackDropProps {
  style?: React.CSSProperties;
  onClose: () => void;
}

const BackDrop = ({
  style,
  onClose,
  children,
}: IBackDropProps & PropsWithChildren) => {
  return (
    <BackDropArea style={{ ...style }} onClick={() => onClose()}>
      {children}
    </BackDropArea>
  );
};

export default BackDrop;
