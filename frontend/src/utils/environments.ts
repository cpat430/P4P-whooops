import { Environment } from '../contexts/EnvironmentContext';

import {
  biologyBuilding,
  coffeeShop1,
  coffeeShop2,
  coffeeShop3,
  kateEdger,
  oggbBuilding,
  quadPos,
} from './locations';
import { generateOtherUsers } from './users';

export const defaultEnvironment: Environment = {
  name: 'Default',
  startingLocation: quadPos,
  otherUsers: [],
  locationMarkerLocations: [],
};

export const coffeeEnvironment: Environment = {
  name: 'Coffee',
  startingLocation: quadPos,
  otherUsers: generateOtherUsers(coffeeShop2, 0.001, 30, 1),
  locationMarkerLocations: [coffeeShop1, coffeeShop2, coffeeShop3],
};

export const goingToLectureEnvironment: Environment = {
  name: 'Going to lecture',
  startingLocation: kateEdger,
  otherUsers: generateOtherUsers(oggbBuilding, 0.001, 40, 1),
  locationMarkerLocations: [biologyBuilding],
};

export const allEnvironments = [coffeeEnvironment, goingToLectureEnvironment];
