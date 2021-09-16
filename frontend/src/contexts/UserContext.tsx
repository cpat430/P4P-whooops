import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { images } from '../user-profiles';
import { singletonIo } from '../utils/singletonSocketIo';
import { TestingGroup, UserProps } from '../utils/types';

const defaultUser: UserProps = {
  id: '',
  lat: -1,
  lng: -1,
  firstName: 'Default',
  lastName: 'User',
  image: images[0],
  interests: [],
  friendIds: [],
  testingGroup: 'no-interest-badge',
};

type UserContextProps = {
  user: UserProps;
  setUser: (user: UserProps) => void;
};

export const UserContext = createContext<UserContextProps>({
  user: defaultUser,
  setUser: (user: UserProps) => console.warn(`${user}`),
});

const io = singletonIo;
export const UserProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<UserProps>(defaultUser);

  useEffect(() => {
    io.on('update-testing-group', (testingGroup: TestingGroup) => {
      setUser((user) => {
        return { ...user, testingGroup };
      });
    });
    return () => {
      io.off('update-testing-group');
    };
  }, []);

  const context = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
