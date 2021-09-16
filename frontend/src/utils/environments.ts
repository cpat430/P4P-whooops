import { Environment } from '../contexts/EnvironmentContext';
import {
  albertStreetCountdown,
  biologyBuilding,
  coffeeShop1,
  coffeeShop2,
  coffeeShop3,
  fortSt,
  generalLibrary,
  kateEdger,
  lowerQueenSt,
  oggbBuilding,
  quadPos,
  quayStreetCountdown,
  symondsBusStop,
  symondsWarMemorial,
  uniHall,
  vicStreetCountdown,
} from './locations';
import { generateOtherUsers } from './users';

export const emptyEnvironment: Environment = {
  name: 'Empty',
  startingLocation: quadPos,
  otherUsers: [],
  locationMarkerLocations: [],
};

export const defaultEnvironment: Environment = {
  name: 'Play around',
  startingLocation: quadPos,
  otherUsers: generateOtherUsers(quadPos, 0.001, 5, 1),
  locationMarkerLocations: [biologyBuilding],
};

export const coffeeEnvironment: Environment = {
  name: 'Choose Coffee',
  startingLocation: kateEdger,
  otherUsers: [
    ...generateOtherUsers(coffeeShop1, 0.0005, 2, 2),
    ...generateOtherUsers(coffeeShop2, 0.0005, 15, 2),
    ...generateOtherUsers(coffeeShop3, 0.0005, 5, 2),
  ],
  locationMarkerLocations: [coffeeShop1, coffeeShop2, coffeeShop3],
};

export const goingToLectureEnvironment: Environment = {
  name: 'Going to lecture',
  startingLocation: kateEdger,
  otherUsers: [
    ...generateOtherUsers(oggbBuilding, 0.0005, 40, 3),
    ...generateOtherUsers(kateEdger, 0.001, 10, 3),
  ],
  locationMarkerLocations: [biologyBuilding],
};

export const oggbToLibraryEnvironment: Environment = {
  name: 'OGGB To Library',
  startingLocation: oggbBuilding,
  otherUsers: [
    ...generateOtherUsers(quadPos, 0.0002, 30, 3),
    ...generateOtherUsers(kateEdger, 0.001, 10, 3),
  ],
  locationMarkerLocations: [generalLibrary],
};

export const unihallToSymonds: Environment = {
  name: 'UniHall To Symonds',
  startingLocation: uniHall,
  otherUsers: [
    ...generateOtherUsers(symondsWarMemorial, 0.0002, 10, 3),
    ...generateOtherUsers(symondsBusStop, 0.001, 10, 3),
  ],
  locationMarkerLocations: [symondsBusStop],
};

export const chooseCountdown: Environment = {
  name: 'Choose Countdown',
  startingLocation: fortSt,
  otherUsers: [
    ...generateOtherUsers(lowerQueenSt, 0.0004, 40, 3),
    ...generateOtherUsers(fortSt, 0.004, 20, 3),
  ],
  locationMarkerLocations: [
    quayStreetCountdown,
    albertStreetCountdown,
    vicStreetCountdown,
  ],
};
export const allEnvironments = [
  emptyEnvironment,
  defaultEnvironment,
  coffeeEnvironment,
  goingToLectureEnvironment,
  oggbToLibraryEnvironment,
  unihallToSymonds,
  chooseCountdown,
];
