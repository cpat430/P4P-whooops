import _ from 'lodash';
import { allInterests } from './interests';
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
  symondsIntersection,
  symondsWarMemorial,
  uniHall,
  vicStreetCountdown,
} from './locations';
import { Environment, Interest } from './types';
import { makeUsers } from './users';

const getYesNoInterest = (interests: Interest[]) => {
  const yesInterest = interests[_.random(0, interests.length - 1)];
  const nonInterests = allInterests.filter((i) => {
    return !interests.some((j) => {
      return i.id === j.id;
    });
  });
  const noInterest = nonInterests[_.random(0, nonInterests.length - 1)];
  return { yesInterest: yesInterest || null, noInterest };
};

export const getEmptyEnvironment = (interests: Interest[]): Environment => {
  return {
    name: 'Empty',
    startingLocation: quadPos,
    otherUsers: [],
    locationMarkerLocations: [],
  };
};

export const getDefaultEnvironment = (interests: Interest[]): Environment => {
  return {
    name: 'Play around',
    startingLocation: quadPos,
    otherUsers: makeUsers(quadPos, 0.001, 5, null, 1, 5, 1),
    locationMarkerLocations: [biologyBuilding],
  };
};

// 3 groups - 1 has more people
export const getCoffeeEnvironment = (interests: Interest[]): Environment => {
  return {
    name: 'Choose Coffee',
    startingLocation: kateEdger,
    otherUsers: [
      ...makeUsers(coffeeShop1, 0.0005, 2, null, 1, 5, 2),
      ...makeUsers(coffeeShop2, 0.0005, 15, null, 1, 5, 2),
      ...makeUsers(coffeeShop3, 0.0005, 5, null, 1, 5, 2),
    ],
    locationMarkerLocations: [coffeeShop1, coffeeShop2, coffeeShop3],
  };
};

// 1 group - common interest
export const getGoingToLectureEnvironment = (
  interests: Interest[]
): Environment => {
  const { yesInterest } = getYesNoInterest(interests);
  return {
    name: 'Going to lecture',
    startingLocation: kateEdger,
    otherUsers: [
      ...makeUsers(oggbBuilding, 0.0005, 40, yesInterest, 1, 5, 3), // common interest
      ...makeUsers(kateEdger, 0.001, 10, null, 1, 5, 3), // random people
    ],
    locationMarkerLocations: [biologyBuilding],
  };
};

// 1 group - not common interest
export const getOGGBToLibraryEnvironment = (
  interests: Interest[]
): Environment => {
  const { noInterest } = getYesNoInterest(interests);
  return {
    name: 'OGGB To Library',
    startingLocation: oggbBuilding,
    otherUsers: [
      ...makeUsers(quadPos, 0.0002, 30, noInterest, 1, 5, 3),
      ...makeUsers(kateEdger, 0.001, 10, null, 1, 5, 3), // random people
    ],
    locationMarkerLocations: [generalLibrary],
  };
};

// 2 groups - 1 common interest, one not TODO
export const getUniHallToSymonds = (interests: Interest[]): Environment => {
  const { yesInterest, noInterest } = getYesNoInterest(interests);
  return {
    name: 'UniHall To Symonds',
    startingLocation: uniHall,
    otherUsers: [
      ...makeUsers(symondsWarMemorial, 0.0002, 10, yesInterest, 1, 5, 3),
      ...makeUsers(symondsIntersection, 0.0002, 10, noInterest, 1, 5, 3),
      ...makeUsers(symondsBusStop, 0.001, 10, null, 1, 5, 3),
    ],
    locationMarkerLocations: [symondsBusStop],
  };
};

// 1 group of people
export const getChooseCountdown = (interests: Interest[]): Environment => {
  const { yesInterest, noInterest } = getYesNoInterest(interests);
  return {
    name: 'Choose Countdown',
    startingLocation: fortSt,
    otherUsers: [
      ...makeUsers(lowerQueenSt, 0.0004, 40, null, 1, 5, 3),
      ...makeUsers(fortSt, 0.004, 20, null, 1, 5, 3),
    ],
    locationMarkerLocations: [
      quayStreetCountdown,
      albertStreetCountdown,
      vicStreetCountdown,
    ],
  };
};

// 3 groups - 1 common, 2 not
export const getAlbertParkHangout = (interests: Interest[]): Environment => {
  const { yesInterest, noInterest } = getYesNoInterest(interests);
  return {
    name: 'Albert Park Hangout',
    startingLocation: albertParkFountain,
    otherUsers: [
      ...makeUsers(albertParkWest, 0.00015, 10, yesInterest, 1, 5, 3),
      ...makeUsers(albertParkEast, 0.00015, 10, noInterest, 1, 5, 3),
      ...makeUsers(albertParkNorth, 0.00015, 10, null, 1, 5, 3),
    ],
    locationMarkerLocations: [albertParkWest, albertParkEast, albertParkNorth],
  };
};

export const allEnvironmentMakers = [
  getEmptyEnvironment,
  getDefaultEnvironment,
  getCoffeeEnvironment,
  getGoingToLectureEnvironment,
  getOGGBToLibraryEnvironment,
  getUniHallToSymonds,
  getChooseCountdown,
  getAlbertParkHangout,
];
