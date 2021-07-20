import { Interest } from './types';

const allInterests = [
  { emoji: '🏀', name: 'basketball' },
  { emoji: '🏊', name: 'swimming' },
  { emoji: '🥋', name: 'karate' },
  { emoji: '🍳', name: 'cooking' },
  { emoji: '⚽️', name: 'soccer' },
  { emoji: '😺', name: 'animals' },
  { emoji: '🤣', name: 'comedy' },
  { emoji: '✈️', name: 'travel' },
  { emoji: '🍔', name: 'food' },
  { emoji: '💄', name: 'beauty' },
  { emoji: '🎨', name: 'art' },
  { emoji: '🎭', name: 'theatre' },
  { emoji: '🎮', name: 'gaming' },
  { emoji: '🧪', name: 'science' },
  { emoji: '💃', name: 'dance' },
  { emoji: '✂️', name: 'diy' },
  { emoji: '🏎', name: 'auto' },
  { emoji: '🎵', name: 'music' },
];
export const dummyInterests = allInterests.map((interest, interestIndex) => {
  return { id: interestIndex, ...interest } as Interest;
});
