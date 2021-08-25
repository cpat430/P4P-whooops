import axios from 'axios';

export type NoIdUserProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const createUser = async (
  props: NoIdUserProps
): Promise<{ id: string; group: number }> => {
  const { firstName, lastName, email } = props;

  const { data } = await axios.post('/services/api/user', {
    firstName,
    lastName,
    email,
  });

  const { id, group } = data;
  console.log(`Created user: ${firstName} ${lastName}, Group: ${group}`);
  return { id, group };
};
