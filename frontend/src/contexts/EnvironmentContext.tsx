import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { StartEnvironmentAppEvent } from '../utils/appEvent';
import { defaultEnvironment } from '../utils/environments';
import { getSingletonSocketIo } from '../utils/singletonSocketIo';
import { trackEvent } from '../utils/trackEvent';
import { LatLng, UserProps } from '../utils/types';

export type Environment = {
  name: string;
  startingLocation: LatLng;
  otherUsers: UserProps[];
  locationMarkerLocations: LatLng[];
};

export const EnvironmentContext =
  createContext<Environment>(defaultEnvironment);

const io = getSingletonSocketIo();

export const EnvironmentProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [environment, setEnvironment] =
    useState<Environment>(defaultEnvironment);

  useEffect(() => {
    io.on('update-env', (environment: Environment) => {
      console.log('Received updates to change env:', environment);
      trackEvent(new StartEnvironmentAppEvent(environment));
      setEnvironment(environment);
    });
  }, []);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
