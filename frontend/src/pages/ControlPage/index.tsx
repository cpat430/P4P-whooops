import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import {
  allEnvironments,
  Environment,
} from '../../contexts/EnvironmentContext';
import { SocketIoContext } from '../../contexts/SocketIoContext';

export const ControlPage = (): JSX.Element => {
  const io = useContext(SocketIoContext);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', width: '100vw', backgroundColor: '#eee' }}
    >
      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Control Panel</Typography>
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
    </Grid>
  );
};
