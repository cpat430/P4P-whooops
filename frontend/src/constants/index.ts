export type User = {
  name: string;
  interests: Interest[];
};

export type Interest = {
  name: string;
  emoji: string;
  id: number;
};
