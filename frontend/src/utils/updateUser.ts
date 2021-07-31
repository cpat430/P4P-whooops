import { UserProps } from './types';

type UpdateUserProps = {
  userDetails: Partial<UserProps>;
  user: UserProps;
  setUser: (user: UserProps) => void;
};

export const updateUser = (props: UpdateUserProps): void => {
  const { userDetails, user, setUser } = props;
  const { id, firstName, lastName, email } = userDetails;

  const newUser = { ...user };

  if (id) {
    newUser.id = id;
  }

  if (firstName) {
    newUser.firstName = firstName;
  }
  if (lastName) {
    newUser.lastName = lastName;
  }
  if (email) {
    newUser.email = email;
  }

  setUser(newUser);
};
