import { createContext } from 'react';
import { User } from '../constants';

const UserContext = createContext<User>({
  name: 'default name',
  interests: [],
});

export default UserContext;
