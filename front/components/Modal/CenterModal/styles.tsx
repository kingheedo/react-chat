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
  min-height: 70px;
  padding: 0 28px 20px;
  font-size: 22px;
  font-weight: 900;
  line-height: 1.36365;
`;

export const CenterModalBody = styled.div``;
export const CenterModalFooter = styled.div``;

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
