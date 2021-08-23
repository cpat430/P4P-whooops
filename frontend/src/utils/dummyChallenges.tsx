import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { AppEvent } from '../contexts/AppEventContext';
import { Challenge } from '../contexts/ChallengeContext';

// I can set the Challenge to have an on start - which is like an initialisation phase, on end (clean up), and helperCard, which is a MUI Card object that contains what you want

export const dummyChallenges: Challenge[] = [
  // TODO add exploration 'NATURAL' phase
  {
    id: 'add-friend-o-week',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    modalContent: (
      <Grid container>
        <Grid item>
          <Typography>
            It is currently O-Week! You are on campus. Choose <b>1</b> other
            person to befriend.
          </Typography>
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'add-friend-music-festival',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    modalContent: (
      <Grid container>
        <Grid item>
          <Typography>
            You are at a music festival. Choose <b>1</b> other person to
            befriend.
          </Typography>
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'dilemma-concert-ticket',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    modalContent: (
      <Grid container>
        <Grid item>
          <Typography>
            You have a spare concert ticket and you have to go with someone
            else. Add another person to be your friend to go with you.
          </Typography>
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'measurement-same-interest',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-user-profile'; // TODO check the user also has basketball
    },
    modalContent: (
      <Grid container>
        <Grid item>
          <Typography>
            Open a user profile who also likes [basketball]
          </Typography>
        </Grid>
      </Grid>
    ),
  },

  {
    id: 'end-dummy',

    modalContent: <Grid>Finish!</Grid>,
  },
];
