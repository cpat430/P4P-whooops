import { Interest, UserProps } from '../pages/MapPage';

export const useDummyUsers = () => {
  const dummyUsers = {
    user1: {
      lat: -36.8484,
      lng: 174.7622,
      name: 'john stockman',
      description: 'love long walks on the beach',
      interests: [
        {
          id: 1,
          name: 'basketball',
        } as Interest,
      ],
    } as UserProps,
    user2: {
      lat: -36.848869,
      lng: 174.781547,
      name: 'michaelangelo',
      description: 'slinging my numchucks',
      interests: [
        {
          id: 2,
          name: 'swimming',
        } as Interest,
        {
          id: 3,
          name: 'karate',
        } as Interest,
      ],
    } as UserProps,
  };

  return dummyUsers;
};
