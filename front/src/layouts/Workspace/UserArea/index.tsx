import useGetUser from '@hooks/useSWR/useGetUser';
import React from 'react';
import UserSquareIcon from '@components/UserSquareIcon';

const UserArea = () => {
  const { user } = useGetUser();

  return user && <UserSquareIcon email={user.email || ''} />;
};

export default UserArea;
