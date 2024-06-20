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
    outline: none;
    padding: 0;
  }

  button {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    border: none;
    outline: none;
    text-decoration: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  li {
    list-style: none;
  }

  em {
    font-style: normal;
  }
`;

export default ResetCss;
