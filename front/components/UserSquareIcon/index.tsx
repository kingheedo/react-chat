import SquareIcon from '@components/SquareIcon';
import useGetUser from '@hooks/useSWR/useGetUser';
import gravatar from 'gravatar';
import React, { PropsWithChildren } from 'react';

interface IUserSquareIconProps {
  email: string;
}

const UserSquareIcon = ({
  email,
  children,
}: IUserSquareIconProps & PropsWithChildren) => {
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
      {children}
    </SquareIcon>
  );
};

export default UserSquareIcon;
