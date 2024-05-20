import React, { PropsWithChildren } from 'react';
import { Item } from './styles';

const SideListItem = ({ children }: PropsWithChildren) => {
  return <Item>{children}</Item>;
};

export default SideListItem;
