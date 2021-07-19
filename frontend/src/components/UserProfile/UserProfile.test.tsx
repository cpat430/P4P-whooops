import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from '.';
import { Interest, UserProps } from '../../pages/MapPage';

// jest.mock('google-map-react', () => <div>Google Map React</div>);

describe('User Profile', () => {
  it('should render user profile', () => {
    const user = {
      id: 1,
      // Sky Tower
      lat: -36.8484,
      lng: 174.7622,
      name: 'john stockman',
      description: 'love long walks on the beach',
      interests: [
        {
          id: 1,
          name: 'basketball',
          emoji: '🏀',
        } as Interest,
      ],
    } as UserProps;
    const isProfileOpen = true;
    const toggleProfile = jest.fn();

    render(
      <UserProfile
        user={user}
        isProfileOpen={isProfileOpen}
        toggleProfile={toggleProfile}
      />
    );

    const userProfile = screen.getByTestId('user-profile');
    const userHeader = screen.getByTestId('user-header');
    const userName = screen.getByTestId('user-name');
    const userInterests = screen.getByTestId('user-interests');
    expect(userProfile).toBeInTheDocument();
    expect(userHeader).toBeInTheDocument();
    expect(userName.innerHTML).toBe('john stockman');
    expect(userInterests).toBeInTheDocument();
  });
});
