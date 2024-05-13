import { Global, css } from '@emotion/react';
import App from '@layouts/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ResetCss from './reset';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={ResetCss} />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
