import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { createUser, NoIdUserProps } from '../../utils/createUser';
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
    const user = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
    } as NoIdUserProps;
    const id = await createUser(user);
    console.log(`created user with id: ${id}`);
    window.location.href = window.location.origin + '/map';
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
