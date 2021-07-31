export type Interest = {
  id: number;
  name: string;
  emoji: string;
};

export type UserProps = {
  id: string;
  index: number;
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  description: string;
  interests: Interest[];
  isFriendsWithUser: boolean;
};
