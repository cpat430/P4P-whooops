import faker from 'faker';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { images } from '../user-profiles';
import { dummyInterests } from './dummyInterests';
import { UserProps } from './types';

// Determines where the users will be located: +- delta from centerPos
export const generateDummyUsers = (
  centerPos: { lat: number; lng: number },
  delta: number,
  numUsers: number,
  seed: number
): UserProps[] => {
  // The seed allows us to reproduce the random values/names, as long as it's generated from faker
  faker.seed(seed);

  // Returns a list of length numUsers of a randomly generated person
  return _.range(numUsers).map((userIndex) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      id: uuid(),
      index: userIndex,
      lat: faker.datatype.number({
        min: centerPos.lat - delta,
        max: centerPos.lat + delta,
        precision: 0.00001,
      }),
      lng: faker.datatype.number({
        min: centerPos.lng - delta,
        max: centerPos.lng + delta,
        precision: 0.00001,
      }),
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(firstName, lastName),
      description: faker.lorem.lines(2),
      image: images[faker.datatype.number({ min: 0, max: images.length - 1 })],
      interests: dummyInterests.filter(() => {
        return faker.datatype.number({ min: 1, max: 2 }) === 1;
      }),
      isFriendsWithUser: faker.datatype.boolean(),
    } as UserProps;
  });
};
