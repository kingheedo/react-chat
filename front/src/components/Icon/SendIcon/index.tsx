import React from 'react';
import { Icon } from './styles';

const SendIcon = () => {
  return (
    <Icon>
      <svg
        data-aba="true"
        data-qa="send-filled"
        aria-hidden="true"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.808a.73.73 0 0 1 0 1.305L2.5 18.462l-.076.018a.75.75 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.79z"
        ></path>
      </svg>
    </Icon>
  );
};

export default SendIcon;
