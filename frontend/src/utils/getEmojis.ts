type UserInterest = {
  id: number;
  name: string;
  emoji: string;
};

export const getEmojis = (userInterests: UserInterest[]): string => {
  const max_emojis = 2;
  const emojis = userInterests.map((interest, index) => {
    if (index < max_emojis) {
      return interest.emoji;
    }
  });

  if (userInterests.length > max_emojis) {
    emojis[max_emojis] = `+${userInterests.length - max_emojis}`;
  }

  return emojis.join('');
};
