import { Item } from '@components/SideListItem/styles';
import styled from '@emotion/styled';

export const WorkspaceDetailWrap = styled.div`
  background: #5c2c5d;
  padding: 8px 18px;
  width: 240px;
  height: 100%;

  > li {
    > a {
      display: flex;
      align-items: center;
      height: 28px;
    }
  }
  .center-modal-wrap {
    width: 100%;
    max-width: 520px;
    height: auto;
  }
`;
export const ChannelListArea = styled.ul``;

export const Head = styled.div`
  padding: 6px 0;
  min-height: 49px;

  h2 {
    display: block;
    width: max-content;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 6px;

    &:hover {
      background: rgba(249, 237, 255, 0.08);
    }

    .info-popup-content {
      ul {
        padding: 12px 0;
        li {
          padding: 0 24px;

          &:not(:last-of-type) {
            border-bottom: 1px solid rgba(29, 28, 29, 0.13);
          }
          button {
            width: 100%;
            text-align: left;
            font-size: 15px;
            line-height: 28px;
            min-height: 28px;
            background: #fff;

            span {
              color: rgb(29, 28, 29);
            }
          }
        }
      }
    }
  }
  .popup {
    .trigger-btn {
      > button {
        font-size: 18px;
        font-weight: 900;
        padding: 3px 8px;
        background: none;
        color: #fff;
      }
    }
  }

  .center-modal-wrap {
    max-width: 650px;
    border-radius: 8px;

    input {
      min-height: 81px;
      width: 100%;
      max-height: 200px;
      border: 1px solid rgba(29, 28, 29, 0.3);
      border-radius: 8px;
      padding: 0 12px;
      font-size: 18px;
      line-height: 1.4668;
    }
  }
`;
export const ChCreateBtn = styled(Item)`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  padding: 0 16px;
  height: 28px;
  > span {
    width: 18px;
    height: 18px;
    font-size: 16px;
    line-height: 17px;
    background: #774d79;
    border-radius: 4px;
  }
`;

export const WorkspaceMemberContainer = styled.ul`
  li {
    height: 28px;
    a {
      display: flex;
      align-items: center;
      height: 100%;
      gap: 8px;

      span {
        position: relative;
        width: 20px;
        height: 20px;

        svg {
          width: 15px;
          height: 15px;
          right: -7px;
          bottom: -3px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
