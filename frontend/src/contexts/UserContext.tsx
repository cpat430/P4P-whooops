import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TestingGroup, UserProps } from '../utils/types';
import { SocketIoContext } from './SocketIoContext';

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

export const UserProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<UserProps>(defaultUser);
  const io = useContext(SocketIoContext);

  useEffect(() => {
    io.on('update-testing-group', (testingGroup: TestingGroup) => {
      setUser((user) => {
        return { ...user, testingGroup };
      });
    });
  }, []);

  const context = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
