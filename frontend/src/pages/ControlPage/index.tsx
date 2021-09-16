import { Button, Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Environment } from '../../contexts/EnvironmentContext';
import { AppEvent, StartEnvironmentAppEvent } from '../../utils/appEvent';
import { allEnvironments } from '../../utils/environments';
import { singletonIo } from '../../utils/singletonSocketIo';
import { trackEvent } from '../../utils/trackEvent';
import { TestingGroup } from '../../utils/types';

const io = singletonIo;
export const ControlPage = (): JSX.Element => {
  const [allAppEvents, setAllAppEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    // init io events
    io.on('update-all-events', (allEvents: AppEvent[]) => {
      setAllAppEvents(allEvents);
    });
    return () => {
      io.off('update-all-events');
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: '100vh',
        width: '100vw',
        padding: '1rem',
        backgroundColor: '#e5e5e5',
      }}
    >
      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={6}>
            <Card>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ padding: '1rem' }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5">Control Panel</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      Environments
                    </Grid>
                    {allEnvironments.map(
                      (environment: Environment, i: number) => {
                        return (
                          <Grid item key={i}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                console.log('Emit once', Date.now());
                                io.emit('change-env', environment);
                                trackEvent(
                                  new StartEnvironmentAppEvent(environment)
                                );
                              }}
                            >
                              {environment.name}
                            </Button>
                          </Grid>
                        );
                      }
                    )}
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

          <Grid item xs={6}>
            <Card>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ padding: '1rem' }}
              >
                <Grid item xs={12}>
                  <Typography variant="h5">Live Events</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ maxHeight: '80vh', overflow: 'scroll' }}
                >
                  {allAppEvents.map((e: AppEvent, i) => {
                    const date = new Date(e.time);

                    return (
                      <Typography
                        gutterBottom
                        key={i}
                      >{`${date.toTimeString()} ${e.name}`}</Typography>
                    );
                  })}
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      // ty stackoverflow
                      const downloadObjectAsJson = (
                        exportObj: any,
                        exportName: string
                      ) => {
                        const dataStr =
                          'data:text/json;charset=utf-8,' +
                          encodeURIComponent(JSON.stringify(exportObj));
                        const downloadAnchorNode = document.createElement('a');
                        downloadAnchorNode.setAttribute('href', dataStr);
                        downloadAnchorNode.setAttribute(
                          'download',
                          exportName + '.json'
                        );
                        document.body.appendChild(downloadAnchorNode); // required for firefox
                        downloadAnchorNode.click();
                        downloadAnchorNode.remove();
                      };
                      downloadObjectAsJson(allAppEvents, 'all-events');
                    }}
                  >
                    download events
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
