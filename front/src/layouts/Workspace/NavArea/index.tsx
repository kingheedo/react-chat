import SquareIcon from '@components/SquareIcon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from './styles';

const linkList = [
  {
    to: '/workspace/channel',
    text: '홈',
  },
];

const NavArea = () => {
  return (
    <LinkContainer>
      <li>
        {linkList.map((link) => (
          <NavLink key={link.text} to={link.to}>
            <SquareIcon>
              <svg
                data-106="true"
                data-qa="home-filled"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </SquareIcon>
            <em>{link.text}</em>
          </NavLink>
        ))}
      </li>
    </LinkContainer>
  );
};

export default NavArea;
