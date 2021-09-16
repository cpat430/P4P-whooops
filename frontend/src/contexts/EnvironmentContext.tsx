import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { defaultEnvironment } from '../utils/environments';
import { singletonIo } from '../utils/singletonSocketIo';
import { LatLng, UserProps } from '../utils/types';

export type Environment = {
  name: string;
  startingLocation: LatLng;
  otherUsers: UserProps[];
  locationMarkerLocations: LatLng[];
};

export const EnvironmentContext =
  createContext<Environment>(defaultEnvironment);

const io = singletonIo;

export const EnvironmentProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [environment, setEnvironment] =
    useState<Environment>(defaultEnvironment);

  useEffect(() => {
    io.on('update-env', (e: Environment) => {
      setEnvironment(e);
    });
    return () => {
      io.off('update-env');
    };
  }, []);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
