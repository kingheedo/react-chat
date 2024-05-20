import React from 'react';
import { Icon } from './styles';

const CaretDownIcon = () => {
  return (
    <Icon>
      <svg
        data-aba="true"
        data-qa="caret-down"
        aria-hidden="true"
        aria-label="caret-down"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06"
          clipRule="evenodd"
        ></path>
      </svg>
    </Icon>
  );
};

export default CaretDownIcon;
