import SquareIcon from '@components/SquareIcon';
import useGetUser from '@hooks/useSWR/useGetUser';
import gravatar from 'gravatar';
import React from 'react';

interface IUserSquareIconProps {
  email: string;
}

const UserSquareIcon = ({ email }: IUserSquareIconProps) => {
  return (
    <SquareIcon>
      {email && (
        <img
          src={gravatar.url(email, {
            size: '30',
            default: 'retro',
          })}
          alt={email}
        />
      )}
    </SquareIcon>
  );
};

export default UserSquareIcon;
