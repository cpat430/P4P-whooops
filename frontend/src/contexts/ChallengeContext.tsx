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
import { EventContext } from './EventContext';

/**
 * Each challenge will have a name, helper
 */
type Challenge = {
  name: string;
};

type ChallengeContextProps = {
  challenge: Challenge;
  nextChallenge: () => void;
};

export const ChallengeContext = createContext<ChallengeContextProps>({
  challenge: { name: 'welcome' },
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
  const { events } = useContext(EventContext);

  const [challenge, setChallenge] = useState({ name: 'unknown' });
  const nextChallenge = () => {
    console.log('hello again');
    setChallenge({ name: 'next-challenge' });
  };

  useEffect(() => {
    console.log('new events!');
    console.log(events);
  }, [events]);

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
