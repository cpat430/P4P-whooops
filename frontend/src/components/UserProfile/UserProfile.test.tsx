import { render, screen } from '@testing-library/react';
import React from 'react';
import { UserProfile } from '.';

describe('User Profile', () => {
  it('should render user profile', () => {
    const user = {
      id: '1',
      index: 1,
      // Sky Tower
      lat: -36.8484,
      lng: 174.7622,
      firstName: 'john',
      lastName: 'stockman',
      email: 'j.stockman@gmail.com',
      image: '',
      description: 'love long walks on the beach',
      interests: [
        {
          id: 1,
          name: 'basketball',
          emoji: '🏀',
        },
      ],
      isFriendsWithUser: false,
    };
    const setUserToNull = jest.fn();
    const toggleIsFriend = jest.fn();

    render(
      <UserProfile
        user={user}
        onClose={setUserToNull}
        onToggleIsFriend={toggleIsFriend}
      />
    );

    const userProfile = screen.getByTestId('user-profile');
    const userName = screen.getByTestId('user-name');
    const userInterests = screen.getByTestId('user-interests');
    expect(userProfile).toBeInTheDocument();
    expect(userName.innerHTML).toBe('john stockman');
    expect(userInterests).toBeInTheDocument();
  });
});
