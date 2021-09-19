import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StartEnvironmentAppEvent } from '../utils/appEvent';
import {
  allEnvironmentMakers,
  getEmptyEnvironment,
} from '../utils/environments';
import { singletonIo } from '../utils/singletonSocketIo';
import { trackEvent } from '../utils/trackEvent';
import { Environment } from '../utils/types';
import { UserContext } from './UserContext';

export const EnvironmentContext = createContext<Environment>(
  getEmptyEnvironment()
);

const io = singletonIo;

export const EnvironmentProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const { user } = useContext(UserContext);
  const [environment, setEnvironment] = useState<Environment>(
    getEmptyEnvironment()
  );

  useEffect(() => {
    io.on('update-env-name', (environmentName: string) => {
      const envCaller = allEnvironmentMakers.find((e) => {
        return e(user.interests).name === environmentName;
      });
      if (envCaller === undefined) {
        throw new Error('Cannot find environment');
      }
      trackEvent(new StartEnvironmentAppEvent(envCaller(user.interests)));
      setEnvironment(envCaller(user.interests));
    });
    return () => {
      io.off('update-env-name');
    };
  }, [user.interests]);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
