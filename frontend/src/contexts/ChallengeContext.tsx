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
import { dummyChallenges } from '../utils/dummyChallenges';
import { AppEvent, AppEventContext } from './AppEventContext';

/**
 * Each challenge will have a name, helper
 */
export type Challenge = {
  id: string;
  init?: () => void; // called at the very start
  acceptFinish?: (appEvent: AppEvent) => boolean;
  cleanup?: () => void; // called at the very end
  modalContent?: JSX.Element; // object to be shown in the modal
};

const defaultChallenge = {
  id: 'default-dummy',
};

type ChallengeContextProps = {
  challenge: Challenge;
};

export const ChallengeContext = createContext<ChallengeContextProps>({
  challenge: defaultChallenge,
});

const allChallenges = dummyChallenges;

export const ChallengeProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  // The challenge handler is able to detect new events
  const { appEvents } = useContext(AppEventContext);

  const [challengeIndex, setChallengeIndex] = useState(0);
  const challenge = allChallenges[challengeIndex]; // This is assumed to be always valid! The last challenge of allChallenges should be never accepting

  const onNewEvent = (event: AppEvent) => {
    // When the context received a new event, it checks if the challenge has been completed
    if (challenge.acceptFinish && challenge.acceptFinish(event)) {
      setChallengeIndex(challengeIndex + 1); // Proceed to next challenge
    }
  };

  useEffect(() => {
    const latestAppEvent = appEvents[appEvents.length - 1];
    if (latestAppEvent) {
      onNewEvent(latestAppEvent);
    }
  }, [appEvents]);

  const context = {
    challenge,
  };

  return (
    <ChallengeContext.Provider value={context}>
      {children}
    </ChallengeContext.Provider>
  );
};
