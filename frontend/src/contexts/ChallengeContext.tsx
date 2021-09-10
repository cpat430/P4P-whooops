import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { defaultChallenge, dummyChallenges } from '../utils/dummyChallenges';
import { UserProps } from '../utils/types';
import { AppEvent, AppEventContext } from './AppEventContext';
import { UserContext } from './UserContext';

/**
 * Each challenge will have a name, helper
 */
export type Challenge = {
  id: string;

  mapProps: { center: { lat: number; lng: number }; zoom: number };
  otherUsers: UserProps[];
  userLocation: { lat: number; lng: number };

  init?: () => void; // called at the very start
  acceptFinish?: (appEvent: AppEvent) => boolean;
  totalTime: () => number; // total time to complete challenge, in seconds
  cleanup?: () => void; // called at the very end

  modalContent?: JSX.Element; // object to be shown in the modal

  startTime?: number;
  endTime?: number;
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
  const { user, setUser } = useContext(UserContext);
  // The challenge handler is able to detect new events
  const { appEvents } = useContext(AppEventContext);

  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challenge, setChallenge] = useState<Challenge>(defaultChallenge);

  useEffect(() => {
    const latestAppEvent = appEvents[appEvents.length - 1];
    if (latestAppEvent) {
      if (challenge.acceptFinish && challenge.acceptFinish(latestAppEvent)) {
        setChallengeIndex(challengeIndex + 1); // Proceed to next challenge
      }
    }
  }, [appEvents]);

  useEffect(() => {
    challenge.cleanup && challenge.cleanup();

    const nextChallenge = allChallenges[challengeIndex];
    nextChallenge.init && nextChallenge.init();

    setChallenge(allChallenges[challengeIndex]);
  }, [challengeIndex]);

  useEffect(() => {
    // on a new challenge, reset the user's location
    const { lat, lng } = challenge.userLocation;
    setUser({ ...user, lat, lng });
  }, [challenge]);

  const context = {
    challenge,
  };

  return (
    <ChallengeContext.Provider value={context}>
      {children}
    </ChallengeContext.Provider>
  );
};
