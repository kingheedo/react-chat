import React from 'react';
import { Circle } from './styles';

interface IOnlineStatusCircleProps {
  active: boolean;
}

const OnlineStatusCircle = ({ active }: IOnlineStatusCircleProps) => {
  return active ? (
    <Circle
      data-aba="true"
      data-qa="presence_indicator"
      aria-hidden="false"
      aria-label="온라인"
      data-qa-type="status-member"
      data-qa-presence-self="true"
      data-qa-presence-active="true"
      data-qa-presence-dnd="false"
      viewBox="0 0 20 20"
      className="online-status-circle"
    >
      <path
        fill={'rgb(32, 162, 113)'}
        d="M14.5 10a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"
      ></path>
    </Circle>
  ) : (
    <Circle
      data-aba="true"
      data-qa="presence_indicator"
      aria-hidden="false"
      aria-label="자리 비움"
      data-qa-type="status-member"
      data-qa-presence-self="false"
      data-qa-presence-active="false"
      data-qa-presence-dnd="false"
      viewBox="0 0 20 20"
      className="online-status-circle"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M7 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
        clip-rule="evenodd"
      ></path>
    </Circle>
  );
};

export default OnlineStatusCircle;
