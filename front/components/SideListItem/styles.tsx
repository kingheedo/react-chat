import styled from '@emotion/styled';

export const Item = styled.li`
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  word-break: break-all;
  color: rgba(249, 237, 255, 0.8);
  font-size: 15px;
  border-radius: 6px;
  color: #fff;
  margin-bottom: 4px;

  a {
    padding: 0 16px;
    display: block;
    width: 100%;
    &.active {
      background: rgba(249, 237, 255, 1);
      color: rgb(57, 6, 58);
    }
  }
  &:hover {
    background-color: rgba(249, 237, 255, 0.08);
  }
`;
