import { Interest } from './types';

export const interestInCommon = (
  userInterests: Interest[],
  selectedInterests: Interest[]
): boolean => {
  if (selectedInterests.length === 0) return true;
  return userInterests.some((userInterest) =>
    selectedInterests.includes(userInterest)
  );
};
