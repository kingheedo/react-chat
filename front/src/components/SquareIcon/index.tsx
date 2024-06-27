import React, { PropsWithChildren } from 'react';
import { Icon } from './styles';

const SquareIcon = ({ children }: PropsWithChildren) => {
  return <Icon className="square-icon">{children}</Icon>;
};

export default SquareIcon;
