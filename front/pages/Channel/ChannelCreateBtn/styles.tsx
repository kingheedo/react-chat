import styled from '@emotion/styled';
import { ChannelItem } from '../styles';

export const Btn = styled(ChannelItem)`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  padding: 0 16px;
  > span {
    width: 18px;
    height: 18px;
    font-size: 16px;
    line-height: 17px;
    background: #774d79;
    border-radius: 4px;
  }
`;
