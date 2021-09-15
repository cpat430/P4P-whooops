import { Interest } from './types';

// All interests and emojis
export const allInterests = [
  { emoji: '🏀', name: 'Basketball' },
  { emoji: '🏊', name: 'Swimming' },
  { emoji: '🥋', name: 'Karate' },
  { emoji: '🍳', name: 'Cooking' },
  { emoji: '⚽️', name: 'Soccer' },
  { emoji: '😺', name: 'Animals' },
  { emoji: '🤣', name: 'Comedy' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '🍔', name: 'Food' },
  { emoji: '💄', name: 'Beauty' },
  { emoji: '🎨', name: 'Art' },
  { emoji: '🎭', name: 'Theatre' },
  { emoji: '🎮', name: 'Gaming' },
  { emoji: '🧪', name: 'Science' },
  { emoji: '💃', name: 'Dance' },
  { emoji: '✂️', name: 'DIY' },
  { emoji: '🏎', name: 'Auto' },
  { emoji: '🎵', name: 'Music' },
].map((interest, interestIndex) => {
  return { id: interestIndex, ...interest } as Interest;
});
