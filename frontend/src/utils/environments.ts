import { Environment } from '../contexts/EnvironmentContext';
import {
  albertParkEast,
  albertParkFountain,
  albertParkNorth,
  albertParkWest,
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

// 3 groups - 1 has more people
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

// 1 group - common interest
export const goingToLectureEnvironment: Environment = {
  name: 'Going to lecture',
  startingLocation: kateEdger,
  otherUsers: [
    ...generateOtherUsers(oggbBuilding, 0.0005, 40, 3),
    ...generateOtherUsers(kateEdger, 0.001, 10, 3), // random people
  ],
  locationMarkerLocations: [biologyBuilding],
};

// 1 group - not common interest
export const oggbToLibraryEnvironment: Environment = {
  name: 'OGGB To Library',
  startingLocation: oggbBuilding,
  otherUsers: [
    ...generateOtherUsers(quadPos, 0.0002, 30, 3),
    ...generateOtherUsers(kateEdger, 0.001, 10, 3), // random people
  ],
  locationMarkerLocations: [generalLibrary],
};

// 2 groups - 1 common interest, one not
export const unihallToSymonds: Environment = {
  name: 'UniHall To Symonds',
  startingLocation: uniHall,
  otherUsers: [
    ...generateOtherUsers(symondsWarMemorial, 0.0002, 10, 3),
    ...generateOtherUsers(symondsBusStop, 0.001, 10, 3),
  ],
  locationMarkerLocations: [symondsBusStop],
};

// 1 group of people
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

// 3 groups - 1 common, 2 not
export const albertParkHangout: Environment = {
  name: 'Albert Park Hangout',
  startingLocation: albertParkFountain,
  otherUsers: [
    ...generateOtherUsers(albertParkWest, 0.00015, 10, 3),
    ...generateOtherUsers(albertParkEast, 0.00015, 10, 3),
    ...generateOtherUsers(albertParkNorth, 0.00015, 10, 3),
  ],
  locationMarkerLocations: [albertParkWest, albertParkEast, albertParkNorth],
};

export const allEnvironments = [
  emptyEnvironment,
  defaultEnvironment,
  coffeeEnvironment,
  goingToLectureEnvironment,
  oggbToLibraryEnvironment,
  unihallToSymonds,
  chooseCountdown,
  albertParkHangout,
];
