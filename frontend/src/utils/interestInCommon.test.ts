import { interestInCommon } from './interestInCommon';
import { Interest } from './types';

describe('Selected Interests', () => {
  const interest1 = {
    id: 1,
    name: 'test-interest1',
    emoji: '🍆',
  } as Interest;

  const interest2 = {
    id: 2,
    name: 'test-interest2',
    emoji: '🌽',
  } as Interest;

  it('test empty interests', () => {
    const userInterests = [] as Interest[];
    const selectedInterests = [] as Interest[];

    const result = interestInCommon(userInterests, selectedInterests);

    expect(result).toBe(true);
  });

  it('test one in common', () => {
    const userInterests = [interest1];
    const selectedInterests = [interest1];

    const result = interestInCommon(userInterests, selectedInterests);

    expect(result).toBe(true);
  });

  it('test none in common', () => {
    const userInterests = [interest1];
    const selectedInterests = [interest2];

    const result = interestInCommon(userInterests, selectedInterests);

    expect(result).toBe(false);
  });
});
