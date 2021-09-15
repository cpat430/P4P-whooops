import { Button, Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Environment } from '../../contexts/EnvironmentContext';
import { allEnvironments } from '../../utils/environments';
import { getSingletonSocketIo } from '../../utils/singletonSocketIo';
import { TestingGroup } from '../../utils/types';

const io = getSingletonSocketIo();
export const ControlPage = (): JSX.Element => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', width: '100vw', backgroundColor: '#e5e5e5' }}
    >
      <Grid item xs={7}>
        <Card style={{ padding: '2rem' }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ maxWidth: '50vw' }}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Control Panel</Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Environments
                </Grid>
                {allEnvironments.map((environment: Environment, i: number) => {
                  return (
                    <Grid item key={i}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          io.emit('change-env', environment);
                        }}
                      >
                        {environment.name}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Change Testing Group
                </Grid>
                {(
                  [
                    'no-interest-badge',
                    'similar-interests',
                    'all-interests',
                  ] as const
                ).map((testingGroup: TestingGroup, i: number) => {
                  return (
                    <Grid item key={i}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          io.emit('change-testing-group', testingGroup);
                        }}
                      >
                        {testingGroup.replaceAll('-', ' ')}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={7}>
        <Card style={{ padding: '2rem' }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Live Events</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
