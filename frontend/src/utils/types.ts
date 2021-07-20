export type Interest = {
  id: number;
  name: string;
  emoji: string;
};

export type UserProps = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  image: string;
  description: string;
  interests: Interest[];
};
