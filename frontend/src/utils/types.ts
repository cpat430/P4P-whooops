export type Interest = {
  id: number;
  name: string;
  emoji: string;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type TestingGroup =
  | 'no-interest-badge'
  | 'similar-interests'
  | 'all-interests';

export type UserProps = {
  id: string;
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  image: string;
  interests: Interest[];
  friendIds: string[];
  testingGroup: TestingGroup;
};
