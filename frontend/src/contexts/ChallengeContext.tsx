// The idea is the user get challenges/prompts.
// E.g. the user can be prompted: Have a look around. Choose the user with the most interests with you.
// When will this user be prompted?

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppEvent, AppEventContext } from './AppEventContext';

/**
 * Each challenge will have a name, helper
 */
type Challenge = {
  name: string;
  finishEventName: string; //the event name that will cause the challenge to finish
  helperMessage: string;
};

type ChallengeContextProps = {
  challenge: Challenge;
  nextChallenge: () => void;
};

export const ChallengeContext = createContext<ChallengeContextProps>({
  challenge: { name: '', finishEventName: '', helperMessage: '' },
  nextChallenge: () => {
    console.log('hello');
  },
});

export const ChallengeProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  // The challenge handler is able to detect new events
  const { appEvents } = useContext(AppEventContext);

  const [challenge, setChallenge] = useState<Challenge>({
    name: 'unknown',
    finishEventName: '',
    helperMessage: '',
  });

  const nextChallenge = () => {
    console.log('hello again');
    setChallenge({
      name: 'next-challenge',
      finishEventName: '',
      helperMessage: '',
    });
  };

  const onNewEvent = (event: AppEvent) => {
    // This is called
    if (event.name === challenge.finishEventName) {
      console.log('Completed challenge!');
    }
  };

  useEffect(() => {
    console.log('new events!');
    console.log(appEvents);

    // The idea is that
    const latestAppEvent = appEvents[appEvents.length - 1];
    if (latestAppEvent) {
      onNewEvent(latestAppEvent);
    }
  }, [appEvents]);

  const context = {
    challenge,
    nextChallenge,
  };

  return (
    <ChallengeContext.Provider value={context}>
      {children}
    </ChallengeContext.Provider>
  );
};
