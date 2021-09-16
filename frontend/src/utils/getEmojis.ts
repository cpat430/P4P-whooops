import { Interest, TestingGroup } from './types';

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
 * Gets the interest string that the user will see. Depends on the testingGroup
 * @param userInterests
 * @param otherUserInterests
 * @param testingGroup
 */
export const getEmojis = (
  userInterests: Interest[],
  otherUserInterests: Interest[],
  testingGroup: TestingGroup
): string | null => {
  const commonInterests = userInterests.filter((userInterest) => {
    return otherUserInterests.some((otherUserInterest) => {
      return userInterest.id === otherUserInterest.id;
    });
  });

  switch (testingGroup) {
    case 'all-interests': {
      // Display the interests as-is
      return getEmojiString(otherUserInterests, 2);
    }
    case 'no-interest-badge': {
      // No interest badge
      return null;
    }
    case 'similar-interests':
      // Only show similar interests
      return getEmojiString(commonInterests, 2);
    default:
      return null;
  }
};

export const getShownInterests = (
  userInterests: Interest[],
  otherUserInterests: Interest[],
  testingGroup: TestingGroup
): Interest[] | null => {
  const commonInterests = userInterests.filter((userInterest) => {
    return otherUserInterests.some((otherUserInterest) => {
      return userInterest.id === otherUserInterest.id;
    });
  });

  switch (testingGroup) {
    case 'all-interests': {
      // Display the interests as-is
      return otherUserInterests.slice(0, 2);
    }
    case 'no-interest-badge': {
      // No interest badge
      return null;
    }
    case 'similar-interests':
      // Only show similar interests
      return commonInterests.slice(0, 2);
    default:
      return null;
  }
};
