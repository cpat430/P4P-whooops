import { Interest } from './types';

export const intersestInCommon = (
  userInterests: Interest[],
  selectedInterests: Interest[]
): boolean => {
  if (selectedInterests.length === 0) return true;
  return userInterests.some((userInterest) =>
    selectedInterests.includes(userInterest)
  );
};
