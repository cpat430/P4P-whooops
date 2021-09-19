import faker from 'faker';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { images } from '../user-profiles';
import { allInterests } from './interests';
import { Interest, LatLng, UserProps } from './types';

// Determines where the users will be located: +- delta from centerPos
export const makeUsers = (
  centerPos: LatLng,
  delta: number,
  numUsers: number,
  includeInterest: Interest | null, // Every user generated here will have at least this interest
  minInterests: number,
  maxInterests: number,
  seed: number
): UserProps[] => {
  // The seed allows us to reproduce the random values/names, as long as it's generated from faker
  faker.seed(seed);

  // Returns a list of length numUsers of a randomly generated person
  return _.range(numUsers).map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const numInterests = faker.datatype.number({
      min: minInterests,
      max: maxInterests,
    });
    const interests = faker.helpers
      .shuffle(allInterests)
      .slice(0, numInterests);

    // Include the includeInterest if it is not chosen yet
    if (
      includeInterest !== null &&
      !interests.some((i) => {
        return i.id === includeInterest.id;
      })
    ) {
      interests[faker.datatype.number({ min: 0, max: interests.length - 1 })] =
        includeInterest;
    }

    return {
      id: uuid(),
      lat: faker.datatype.number({
        min: centerPos.lat - delta,
        max: centerPos.lat + delta,
        precision: 0.000001,
      }),
      lng: faker.datatype.number({
        min: centerPos.lng - delta,
        max: centerPos.lng + delta,
        precision: 0.000001,
      }),
      firstName: firstName,
      lastName: lastName,
      image: images[faker.datatype.number({ min: 0, max: images.length - 1 })],
      interests,
      friendIds: [],
      testingGroup: 'no-interest-badge',
    };
  });
};
