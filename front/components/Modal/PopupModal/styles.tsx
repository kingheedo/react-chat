import styled from '@emotion/styled';

export const Popup = styled.div`
  .info-popup {
    &-content {
      position: absolute;
      z-index: 1;
      display: none;
      width: 360px;
      background: white;
      border-radius: 8px;
      overflow: hidden;

      &.active {
        display: block;
      }
    }
  }
`;
