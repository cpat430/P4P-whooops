import axios from 'axios';

export type NoIdUserProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const createUser = async (props: NoIdUserProps): Promise<string> => {
  const { firstName, lastName, email } = props;

  console.log(`Creating user: ${firstName} ${lastName}`);

  const { data } = await axios.post('/services/api/user', {
    firstName,
    lastName,
    email,
  });

  return data;
};
