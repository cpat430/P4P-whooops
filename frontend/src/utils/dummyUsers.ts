import faker from 'faker';
import _ from 'lodash';
import { images } from '../user-profiles';
import { dummyInterests } from './dummyInterests';
import { UserProps } from './types';

// Determines where the users will be located: +- delta from the sky tower
const skyTowerPos = {
  lat: -36.8484,
  lng: 174.7622,
};
const delta = 0.1;

const generateDummyUsers = (numUsers: number, seed: number) => {
  // The seed allows us to reproduce the random values/names, as long as it's generated from faker
  faker.seed(seed);

  // Returns a list of length numUsers of a randomly generated person
  return _.range(numUsers).map((userIndex) => {
    return {
      id: userIndex,
      lat: faker.datatype.number({
        min: skyTowerPos.lat - delta,
        max: skyTowerPos.lat + delta,
        precision: 0.00001,
      }),
      lng: faker.datatype.number({
        min: skyTowerPos.lng - delta,
        max: skyTowerPos.lng + delta,
        precision: 0.00001,
      }),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      description: faker.lorem.paragraphs(1),
      image: images[faker.datatype.number({ min: 0, max: images.length - 1 })],
      interests: dummyInterests.filter(() => {
        return faker.datatype.number({ min: 1, max: 2 }) === 1;
      }),
      isFriendsWithUser: faker.datatype.boolean(),
    } as UserProps;
  });
};

export const dummyUsers = generateDummyUsers(20, 1);
