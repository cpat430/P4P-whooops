import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { createUser, NoIdUserProps } from '../../utils/createUser';
import { updateUser } from '../../utils/updateUser';
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageForm,
  PageHeader,
  PageTextField,
  PageTitle,
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
    const userDetails = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
    } as NoIdUserProps;

    const id = await createUser(userDetails);
    const userDetailsWithId = {
      id,
      ...userDetails,
    };
    updateUser({ userDetails: userDetailsWithId, user, setUser });
    history.push('/map');
  };

  return (
    <PageContainer data-testid="home-page">
      <PageHeader>
        <PageTitle variant="h3">Welcome to Shweep</PageTitle>
      </PageHeader>
      <PageContent>
        <PageForm onSubmit={handleSubmit}>
          <Typography variant="h4">Enter your details</Typography>
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
          <Button type="submit">Continue to choose your interests</Button>
        </PageForm>
      </PageContent>
      <PageFooter>subscribe to the youtube channel</PageFooter>
    </PageContainer>
  );
};
