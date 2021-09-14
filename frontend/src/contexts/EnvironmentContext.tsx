import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import {
  biologyBuilding,
  coffeeShop1,
  coffeeShop2,
  coffeeShop3,
  kateEdger,
  oggbBuilding,
  quadPos
} from '../utils/locations';
import { UserProps } from '../utils/types';
import { generateOtherUsers } from '../utils/users';
import { SocketIoContext } from './SocketIoContext';

export type Environment = {
  name: string;
  startingLocation: { lat: number; lng: number };
  otherUsers: UserProps[];
  locationMarkerLocations: { lat: number; lng: number }[];
};

const defaultEnvironment: Environment = {
  name: '',
  startingLocation: quadPos,
  otherUsers: [],
  locationMarkerLocations: [],
};

const coffeeEnvironment: Environment = {
  name: 'Coffee',
  startingLocation: quadPos,
  otherUsers: generateOtherUsers(coffeeShop2, 0.001, 30, 1),
  locationMarkerLocations: [coffeeShop1, coffeeShop2, coffeeShop3],
};

const goingToLectureEnvironment: Environment = {
  name: 'Going to lecture',
  startingLocation: kateEdger,
  otherUsers: generateOtherUsers(oggbBuilding, 0.001, 40, 1),
  locationMarkerLocations: [biologyBuilding],
};

export const allEnvironments = [coffeeEnvironment, goingToLectureEnvironment];

export const EnvironmentContext =
  createContext<Environment>(defaultEnvironment);

export const EnvironmentProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [environment, setEnvironment] =
    useState<Environment>(defaultEnvironment);
  const io = useContext(SocketIoContext);

  useEffect(() => {
    io.on('update-env', (environment: Environment) => {
      console.log('Received updates to cahnge env:', environment);
      setEnvironment(environment);
    });
  }, []);

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};
