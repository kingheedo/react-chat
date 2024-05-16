import styled from '@emotion/styled';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  > header {
    width: 100%;
    height: 40px;
    background: green;
  }

  .content {
    display: flex;
    height: 100%;

    nav {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      background: red;
      flex: 0 0 70px;

      .top {
        flex: 1 1 auto;
        height: 0;
        overflow: auto;
      }

      .bottom {
        button {
          width: 36px;
          height: 36px;
        }
      }
    }
    main {
      background: pink;
      flex: 1 0 auto;
    }
  }
`;
