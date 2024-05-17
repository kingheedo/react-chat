import styled from '@emotion/styled';

export const LinkContainer = styled.ul`
  li {
    text-align: center;
    a {
      display: block;
      margin: 16px 0;
      &.active {
        > span {
          background: rgba(0, 0, 0, 0.25);
        }
      }
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        margin-bottom: 4px;

        &:is(:focus, :hover),
        &:hover {
          background: rgba(0, 0, 0, 0.25);
        }
      }
      > em {
        font-size: 11px;
        font-weight: 700;
        line-height: 12px;
        color: white;
      }

      svg {
        display: block;
        font-size: 20px;
        width: 1em;
        height: 1em;
        color: white;
      }
    }
  }
`;
