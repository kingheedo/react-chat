import React from 'react';
import { Badge } from './styles';

interface IChatBadgeProps {
  count: number;
}

const ChatBadge = ({ count }: IChatBadgeProps) => {
  return count ? <Badge>{count}</Badge> : null;
};

export default ChatBadge;
