import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders map page', () => {
  render(<App />);
  const mapPage = screen.getByTestId('home-page');
  expect(mapPage).toBeInTheDocument();
});
