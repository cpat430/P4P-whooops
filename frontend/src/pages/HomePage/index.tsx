import { Divider, Grid, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { createUser } from '../../utils/createUser';
import {
  PageBackgroundGrid,
  PageCard,
  PageForm,
  PageTextField,
  RegisterTextField,
  SubmitButton,
} from './HomePage.styled';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
};

export const HomePage = (): JSX.Element => {
  const [formValues, setFormValues] = useState(defaultValues);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleInputChange = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // means we can do what we like.

    const { firstName, lastName, email } = formValues;

    const { id, group } = await createUser({ firstName, lastName, email });
    // get group id

    setUser({
      ...user,
      id,
      firstName,
      lastName,
      email,
      group,
    });

    history.push('/map');
  };

  return (
    <PageBackgroundGrid container justifyContent="center" alignItems="center">
      <Grid item>
        <PageCard>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            data-testid="home-page"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="h4">Welcome!</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Enjoy our app :)</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <PageForm onSubmit={handleSubmit}>
                <RegisterTextField>Register</RegisterTextField>
                <PageTextField
                  id="first-name-input"
                  placeholder="e.g. John"
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  required
                />
                <PageTextField
                  id="last-name-input"
                  placeholder="e.g. Walker"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  required
                />
                <PageTextField
                  id="email-input"
                  placeholder="e.g. test@gmail.com"
                  label="Email"
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                />
                <SubmitButton variant="contained" fullWidth type="submit">
                  Enter
                </SubmitButton>
              </PageForm>
            </Grid>
          </Grid>
        </PageCard>
      </Grid>
    </PageBackgroundGrid>
  );
};
