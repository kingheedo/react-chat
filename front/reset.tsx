import { css } from '@emotion/react';

const ResetCss = css`
  blockquote,
  body,
  caption,
  dd,
  dl,
  fieldset,
  figure,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  legend,
  ol,
  p,
  pre,
  table,
  td,
  th,
  ul {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }

  button {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    border: none;
    border-radius: 4px;
    outline: none;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    display: inline-flex;
    position: relative;
  }

  a {
    text-decoration: none;
  }
`;

export default ResetCss;
