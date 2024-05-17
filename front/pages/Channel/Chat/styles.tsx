import styled from '@emotion/styled';

export const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
`;
export const ChatHeader = styled.div`
  padding: 12px;

  h2 {
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.33334;

    > svg {
      width: 18px;
      height: 18px;
    }
  }
`;
export const ChatContent = styled.div`
  overflow: auto;
  height: 0;
  flex: 1 1 auto;

  &::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(29, 28, 29, 0.52);
    border-radius: 8px 8px 8px 8px;
    background-clip: padding-box;
    border: 3px solid transparent;
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
  .text-top {
    display: flex;
    gap: 6px;
  }
  strong {
    color: #1d1c1d;
    margin
  }
  p {
    font-size: 15px;
    line-height: 1.46668;
    word-wrap: break-word;
    white-space:pre-line;
  }
`;

export const ChatForm = styled.form`
  height: 118px;
  padding: 12px;
  textarea {
    width: 100%;
    height: 100%;
  }
`;

export const ChatDate = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background: black;
  
  span {
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgb(29, 28, 29);
    border-radius: 24px;
    font-size 13px;
    font-weight 700;
    padding-inline: 16px;
    background: #fff;
  }
`;
