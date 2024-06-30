import styled from '@emotion/styled';

export const CenterModalWrap = styled.div`
  position: relative;
  background: #fff;
  padding: 24px;
`;

export const CenterModalHead = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 28px 0 0;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 900;
  line-height: 1.36365;
`;

export const CenterModalBody = styled.div``;
export const CenterModalFooter = styled.div`
  display: flex;
  margin-top: 20px;

  .primary-btn {
    min-width: 80px;
    height: 36px;
    padding: 0 12px 1px;
    margin-left: auto;
  }

  .primary-btn {
    &.active {
      color: #fff;
      box-shadow: none;
      background: #007a5a;
      font-weight: 700;
      transition: all 80ms linear;
    }
  }
`;

export const CenterModalCoseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  display: block;
  width: 36px;
  height: 36px;
  background: none;

  svg {
    width: 20px;
    height: 20px;
  }
`;
