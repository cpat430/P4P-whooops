import { Interest } from './types';

// All interests and emojis
const allInterests = [
  { emoji: '๐', name: 'Basketball' },
  { emoji: '๐', name: 'Swimming' },
  { emoji: '๐ฅ', name: 'Karate' },
  { emoji: '๐ณ', name: 'Cooking' },
  { emoji: 'โฝ๏ธ', name: 'Soccer' },
  { emoji: '๐บ', name: 'Animals' },
  { emoji: '๐คฃ', name: 'Comedy' },
  { emoji: 'โ๏ธ', name: 'Travel' },
  { emoji: '๐', name: 'Food' },
  { emoji: '๐', name: 'Beauty' },
  { emoji: '๐จ', name: 'Art' },
  { emoji: '๐ญ', name: 'Theatre' },
  { emoji: '๐ฎ', name: 'Gaming' },
  { emoji: '๐งช', name: 'Science' },
  { emoji: '๐', name: 'Dance' },
  { emoji: 'โ๏ธ', name: 'DIY' },
  { emoji: '๐', name: 'Auto' },
  { emoji: '๐ต', name: 'Music' },
];

export const dummyInterests = allInterests.map((interest, interestIndex) => {
  return { id: interestIndex, ...interest } as Interest;
});
