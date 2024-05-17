import styled from '@emotion/styled';

export const SpaceContainer = styled.ul`
  li {
    margin-bottom: 4px;

    button {
      width: 36px;
      height: 36px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          display: block;
          width: 1em;
          height: 1em;
          font-size: 20px;
        }
      }
    }
  }

  .info-popup {
    position: absolute;
    display: none;
    z-index: 1;
    width: 360px;
    height: 242px;
    background: white;

    &.active {
      display: block;
    }
    &-content {
      ul {
        li {
          margin: 0;
          padding: 8px;
          &:hover {
            background: rgba(0, 0, 0, 0.075);
          }
          button {
            width: 100%;
            justify-content: left;
            font-size: 15px;
            font-weight: 400;
            color: #454547;
            line-height: 18px;
            background: none;
            gap: 8px;
            span {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              width: 36px;
              height: 36px;
              background: rgba(29, 28, 29, 0.06);

              svg {
                display: block;
                font-size: 20px;
                width: 1em;
                height: 1em;
              }
            }
          }
        }
      }
    }
  }
  .center-modal-wrap {
    width: 472px;
  }
`;
