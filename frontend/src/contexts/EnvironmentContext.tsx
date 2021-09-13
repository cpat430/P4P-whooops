import React, { createContext, ReactNode, useState } from 'react';
import { quadPos } from '../utils/locations';
import { UserProps } from '../utils/types';

/**
 * Each environment will have a name, helper
 */
export type Environment = {
  mapProps: { center: { lat: number; lng: number }; zoom: number };
  otherUsers: UserProps[];
  userLocation: { lat: number; lng: number };
};

const defaultEnvironment = {
  mapProps: { center: quadPos, zoom: 19 },
  otherUsers: [],
  userLocation: quadPos,
};

export const EnvironmentContext =
  createContext<Environment>(defaultEnvironment);

export const EnvironmentProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  /**
   * The Environment Context is the environment around the participant.
   * Includes:
   * - people
   * - where they are
   * - what map they initially see
   */
  const [environment, setEnvironment] =
    useState<Environment>(defaultEnvironment);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
