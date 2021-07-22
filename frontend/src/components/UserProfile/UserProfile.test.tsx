import { render, screen } from '@testing-library/react';
import React from 'react';
import { UserProfile } from '.';

describe('User Profile', () => {
  it('should render user profile', () => {
    const user = {
      id: 1,
      // Sky Tower
      lat: -36.8484,
      lng: 174.7622,
      name: 'john stockman',
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
    const isProfileOpen = true;
    const setCurrentUser = jest.fn();
    const handleUpdateFriend = jest.fn();

    render(
      <UserProfile
        user={user}
        isProfileOpen={isProfileOpen}
        setCurrentUser={setCurrentUser}
        handleUpdateFriend={handleUpdateFriend}
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
