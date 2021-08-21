const questions = [
  'How did you find it?',
  'What did you think?',
  'What would you do differently?',
];

export const getRandomQuestion = (): string => {
  return questions[Math.floor(Math.random() * questions.length)];
};
