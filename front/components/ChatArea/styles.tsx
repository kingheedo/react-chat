import styled from '@emotion/styled';
import Scrollbars from 'react-custom-scrollbars-2';

export const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
`;
export const Header = styled.div`
  padding: 12px;

  h2 {
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 22px;
    font-weight: 900;
    line-height: 1.33334;

    > svg {
      width: 18px;
      height: 18px;
    }
  }
`;
export const Scrollbar = styled(Scrollbars)`
  .chat-content {
    position: relative;
    padding-top: 30px;

    .date {
      display: flex;
      align-items: center;
      position: sticky;
      z-index: 1;
      width: max-content;
      height: 28px;
      top: 30px;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid rgb(29, 28, 29);
      border-radius: 24px;
      padding-inline: 16px;
      background: #fff;

      &-line {
        position: absolute;
        top: 30px;
        width: 100%;
        height: 1px;
        background: black;
      }
    }
  }
`;
export const ChatItem = styled.div`
  display: flex;
  align-items: start;
  padding: 8px;
  > span {
    img {
      min-width: 36px;
      width: 100%;
      height: 100%;
    }
  }
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: -4px 0 0 4px;
  word-break: break-all;
  .chat-user {
    display: flex;
    gap: 6px;
  }
  .chat-text {
    overflow: hidden;
    white-space: no-wrap;
  }
`;

export const EditorWrap = styled.div`
  height: 180;

  .submit-btn {
    position: absolute;
    background: #fff;
    width: 30;
    height: 30;
    bottom: 10;
    right: 10;
  }
`;
