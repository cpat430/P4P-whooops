import { Interest } from './types';

const getEmojiString = (
  interests: Interest[],
  emojiLimit: number
): string | null => {
  if (interests.length === 0) return null;
  const emojis = interests.map((interest) => {
    return interest.emoji;
  });
  const nbsp = String.fromCharCode(160); // no-break space

  return interests.length <= emojiLimit
    ? emojis.concat().join(nbsp)
    : emojis
        .slice(0, emojiLimit)
        .concat('+' + (emojis.length - 2).toString())
        .join(nbsp);
};

/**
 * Gets the interest string that the user will see. Depends on the group value
 * @param userInterests
 * @param otherUserInterests
 * @param group
 */
export const getEmojis = (
  userInterests: Interest[],
  otherUserInterests: Interest[],
  group: number
): string | null => {
  const commonInterests = userInterests.filter((userInterest) => {
    return otherUserInterests.some((otherUserInterest) => {
      return userInterest.id === otherUserInterest.id;
    });
  });

  const nonCommonInterests = otherUserInterests.filter((otherUserInterest) => {
    return !commonInterests.some((commonInterest) => {
      return otherUserInterest.id === commonInterest.id;
    });
  });

  switch (group) {
    case 1: {
      // Group A - see relevant interests first?
      const interestOrder = commonInterests.concat(nonCommonInterests);
      return getEmojiString(interestOrder, 2);
    }
    case 2: {
      // Group B - see nonrelevant interests first?
      const interestOrder = nonCommonInterests.concat(commonInterests);
      return getEmojiString(interestOrder, 2);
    }
    case 3: // Group C - see  no interests
      return null;
    default:
      return null;
  }
};
