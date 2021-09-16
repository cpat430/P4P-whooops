import { Divider, Grid, Typography } from '@material-ui/core';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { images } from '../../user-profiles';
import { SubmitDetailsAppEvent } from '../../utils/appEvent';
import { trackEvent } from '../../utils/trackEvent';
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

    const { firstName, lastName } = formValues;
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    trackEvent(new SubmitDetailsAppEvent(trimmedFirstName, trimmedLastName));

    setUser({
      ...user,
      image: images[_.random(0, images.length - 1)],
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
    });

    history.push('/app/map');
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
                <RegisterTextField>Details</RegisterTextField>
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
