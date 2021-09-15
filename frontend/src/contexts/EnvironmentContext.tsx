import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { defaultEnvironment } from '../utils/environments';
import { getSingletonSocketIo } from '../utils/singletonSocketIo';
import { UserProps } from '../utils/types';

export type Environment = {
  name: string;
  startingLocation: { lat: number; lng: number };
  otherUsers: UserProps[];
  locationMarkerLocations: { lat: number; lng: number }[];
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
      setEnvironment(environment);
    });
  }, []);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
