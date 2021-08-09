import { AppEvent } from '../contexts/AppEventContext';
import { Challenge } from '../contexts/ChallengeContext';

export const dummyChallenges: Challenge[] = [
  {
    name: 'exploration',
    acceptFinish: (): boolean => {
      // TODO determine a way to identify when they have finished exploring
      return true;
    },
    helperMessage: 'Have a play around!',
  },
  {
    name: 'choose person who also likes basketball',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-user-profile'; // and user has to like basketball
    },
    helperMessage: 'Press the profile of a person who likes basketball',
  },
  {
    name: 'choose person most likely to add friend',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    helperMessage: 'Choose a person that you would most likely add',
  },
  {
    name: 'choose person least likely to add friend',
    acceptFinish: (appEvent: AppEvent): boolean => {
      return appEvent.name === 'click-add-friend-button';
    },
    helperMessage: 'Add a friend with someone who you are least likely to add',
  },
  {
    name: 'finished',
    acceptFinish: (): boolean => {
      return false;
    },
    helperMessage: 'thanks! bye',
  },
];
