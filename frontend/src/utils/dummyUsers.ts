import { Interest, UserProps } from '../pages/MapPage';

export const useDummyUsers = (): UserProps[] => {
  const dummyUsers = [
    {
      id: 1,
      // Sky Tower
      lat: -36.8484,
      lng: 174.7622,
      name: 'john stockman',
      description: 'love long walks on the beach',
      interests: [
        {
          id: 1,
          name: 'basketball',
          emoji: '🏀',
        } as Interest,
        {
          id: 2,
          name: 'swimming',
          emoji: '🏊',
        } as Interest,
        {
          id: 3,
          name: 'karate',
          emoji: '🥋',
        } as Interest,
        {
          id: 4,
          name: 'cooking',
          emoji: '🍳',
        } as Interest,
        {
          id: 5,
          name: 'soccer',
          emoji: '⚽️',
        } as Interest,
      ],
    } as UserProps,
    {
      id: 2,
      // flat
      lat: -36.848869,
      lng: 174.781547,
      name: 'michaelangelo',
      description: 'slinging my numchucks',
      interests: [
        {
          id: 2,
          name: 'swimming',
          emoji: '🏊',
        } as Interest,
        {
          id: 3,
          name: 'karate',
          emoji: '🥋',
        } as Interest,
      ],
    } as UserProps,
  ];

  return dummyUsers;
};
