import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { AppEvent } from '../contexts/AppEventContext';
import { Challenge } from '../contexts/ChallengeContext';
import { quadPos, sparkArenaPos } from './locations';
import { generateOtherUsers } from './users';

export const defaultChallenge: Challenge = {
  id: 'default-challenge',
  mapProps: {
    center: sparkArenaPos,
    zoom: 19,
  },
  otherUsers: [],
  userLocation: sparkArenaPos,
  init: function () {
    this.startTime = Date.now();
  },
  totalTime: function () {
    // Returns the total time, in seconds
    if (!this.startTime || !this.endTime) {
      return -1;
    }
    return (this.endTime - this.startTime) / 1000;
  },
  cleanup: function () {
    this.endTime = Date.now();
    console.log(`Challenge took: ${this.totalTime()}s`);
  },
};

export const dummyChallenges: Challenge[] = [
  {
    ...defaultChallenge,
    id: 'wait-10-seconds',
    userLocation: quadPos,
    mapProps: {
      center: quadPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(quadPos, 0.001, 20, 1),
    acceptFinish: function (): boolean {
      const waitTime = 10 * 1000; // 10 seconds
      if (this.startTime) {
        return Date.now() - this.startTime >= waitTime;
      }
      return false;
    },
    modalContent: (
      <Grid container>
        <Grid item>
          <Typography>
            Play around! A new task will appear after 10 seconds
          </Typography>
        </Grid>
      </Grid>
    ),
  },
  {
    ...defaultChallenge,
    id: 'add-friend-o-week',
    userLocation: quadPos,
    mapProps: {
      center: quadPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(quadPos, 0.001, 20, 1),
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
    ...defaultChallenge,
    id: 'dilemma-concert-ticket',
    userLocation: sparkArenaPos,
    mapProps: {
      center: sparkArenaPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(sparkArenaPos, 0.001, 20, 2),
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
    ...defaultChallenge,
    id: 'quick-survey',
    userLocation: quadPos,
    mapProps: {
      center: sparkArenaPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(sparkArenaPos, 0.001, 20, 3),
    acceptFinish: (appEvent: AppEvent): boolean => {
      // TODO submit form
      return appEvent.name === 'submit-survey'; // TODO check the user also has basketball
    },
    modalContent: (
      <FeedbackPanel
        question="How easy did you find that previous task?"
        onSubmit={() => {
          console.log('TODO handle survey'); // TODO
        }}
      />
    ),
  },
  {
    ...defaultChallenge,
    id: 'measurement-same-interest',
    userLocation: quadPos,
    mapProps: {
      center: sparkArenaPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(sparkArenaPos, 0.001, 20, 3),
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
    ...defaultChallenge,
    id: 'end-dummy',
    userLocation: quadPos,
    mapProps: {
      center: sparkArenaPos,
      zoom: 19,
    },
    otherUsers: generateOtherUsers(sparkArenaPos, 0.1, 20, Math.random()),

    modalContent: <Grid>Finish!</Grid>,
  },
];
