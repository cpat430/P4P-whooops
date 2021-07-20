import { UserProps } from '../pages/MapPage';
import { dummyInterests } from './dummyInterests';
import image1 from '../user-profiles/png/018-boy-3.png';
import image2 from '../user-profiles/png/019-woman-5.png';

export const useDummyUsers = (): UserProps[] => {
  const dummyUsers = [
    {
      id: 1,
      // Sky Tower
      lat: -36.8484,
      lng: 174.7622,
      name: 'john stockman',
      description: 'love long walks on the beach',
      image: image1,
      interests: [0, 1, 2, 3, 4].map((interestIndex) => {
        return dummyInterests[interestIndex];
      }),
    },
    {
      id: 2,
      // flat
      lat: -36.848869,
      lng: 174.781547,
      name: 'michaelangelo',
      image: image2,
      description: 'slinging my numchucks',
      interests: [0, 3, 4].map((interestIndex) => {
        return dummyInterests[interestIndex];
      }),
    },
  ];

  return dummyUsers;
};
