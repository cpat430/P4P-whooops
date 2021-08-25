import React, { createContext, ReactNode, useState } from 'react';
import { UserProps } from '../utils/types';

const defaultUser: UserProps = {
  id: '',
  lat: -1,
  lng: -1,
  firstName: 'Default',
  lastName: 'User',
  email: 'test@gmail.com',
  image: '',
  description: '',
  interests: [],
  friendIds: [],
  group: 0, // 0 means no group!
};

type UserContextProps = {
  user: UserProps;
  setUser: (user: UserProps) => void;
};

export const UserContext = createContext<UserContextProps>({
  user: defaultUser,
  setUser: (user: UserProps) => console.warn(`${user}`),
});

export const UserProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<UserProps>(defaultUser);

  const context = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
