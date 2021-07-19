import React, { createContext, ReactNode } from 'react';
import { User } from '../constants';

const defaultUser = {
  name: 'Default Name',
  interests: [],
};
export const UserContext = createContext<User>(defaultUser);

export const UserProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  return (
    <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>
  );
};
