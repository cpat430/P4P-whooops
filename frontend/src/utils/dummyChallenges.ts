import { AppEvent } from '../contexts/AppEventContext';
import { Challenge } from '../contexts/ChallengeContext';

export const dummyChallenges: Challenge[] = [
  {
    name: 'exploration',
    acceptFinish: (): boolean => {
      return true;
    },
    helperMessage: 'have a play around!',
  },
  {
    name: 'choose person most likely to add friend',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    helperMessage: 'choose a person most likely to add friend ',
  },
  {
    name: 'choose person least likely to add friend',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    helperMessage: 'choose a person least likely to add friend ',
  },
  {
    name: 'finished',
    acceptFinish: (): boolean => {
      return false;
    },
    helperMessage: 'thanks! bye',
  },
];
