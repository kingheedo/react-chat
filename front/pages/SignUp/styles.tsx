import styled from '@emotion/styled';

export const Section = styled.section`
  display: block;
  min-width: 1200px;
  margin: 0 auto;

  > header {
    display: flex;
    justify-content: center;
    padding: 48px 0 40px;
    text-align: center;
    letter-spacing: -0.75px;
    margin-bottom: 10px;
    font-size: 48px;
    font-weight: 700;
    line-height: 46px;
    > a {
      color: #1d1c1d;
    }
  }
`;
