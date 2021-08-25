export type Interest = {
  id: number;
  name: string;
  emoji: string;
};

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
  group: number; // which A/B/N group they are in
};
