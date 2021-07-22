import React, { createContext, ReactNode } from 'react';
import { UserProps } from '../utils/types';

const defaultUser = {
  id: -1,
  lat: -1,
  lng: -1,
  name: 'Default User',
  image: '',
  description: '',
  interests: [],
  isFriendsWithUser: false,
};
export const UserContext = createContext<UserProps>(defaultUser);

export const UserProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  return (
    <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>
  );
};
