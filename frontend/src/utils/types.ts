export type Interest = {
  id: number;
  name: string;
  emoji: string;
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
  email: string;
  image: string;
  description: string;
  interests: Interest[];
  friendIds: string[];
  testingGroup: TestingGroup;
};

export type AppEvent = {
  name:
    | 'init-app'
    | 'click-add-friend-button'
    | 'click-user-profile'
    | 'click-edit-interest'
    | 'submit-survey'
    | 'click-location-marker';
};
