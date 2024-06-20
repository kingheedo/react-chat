import { Item } from '@components/SideListItem/styles';
import styled from '@emotion/styled';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  > header {
    width: 100%;
    height: 40px;
    background: #3a073b;
  }

  .content {
    display: flex;
    height: 100%;

    nav {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: #3a073b;
      padding: 8px 0;
      flex: 0 0 70px;

      .top {
        flex: 1 1 auto;
        height: 0;
        overflow: auto;
      }

      .bottom {
        > button {
          width: 36px;
          height: 36px;
          padding: 0;
          overflow: hidden;

          > span {
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    main {
      display: flex;
      flex: 1 1 auto;
    }
  }
`;
