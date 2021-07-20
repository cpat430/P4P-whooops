import React from 'react';
import { Avatar, Chip, Divider, Modal } from '@material-ui/core';
import { UserProps } from '../../pages/MapPage';
import * as Styled from './UserProfile.styled';
import { useState } from 'react';
import { useEffect } from 'react';

type UserProfileProps = {
  user: UserProps;
  isProfileOpen: boolean;
  toggleProfile: () => void;
};

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { user } = props;
  const { name, description, interests } = user;
  const { isProfileOpen, toggleProfile } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClose = () => {
    toggleProfile();
  };

  const handleClick = () => {
    console.log('interest clicked');
  };

  useEffect(() => {
    setIsLoading(true);
    if (!user) return;
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div data-testid={'loading'}>
        <span>loading...</span>
      </div>
    );
  }

  return (
    <Modal
      open={isProfileOpen}
      disableAutoFocus
      disableEnforceFocus
      onClose={handleClose}
      data-testid={'user-profile'}
    >
      <Styled.ProfileDetailsContainer data-testid={'profile-details-container'}>
        <Styled.UserHeader data-testid={'user-header'}>
          <Styled.UserAvatar
            alt={name}
            src={user.image}
            data-testid={'user-avatar'}
          />
          <Styled.UserName data-testid={'user-name'}>{name}</Styled.UserName>
        </Styled.UserHeader>
        <Divider />
        <Styled.UserText variant="h4" data-testid={'bio-user-text'}>
          Bio
        </Styled.UserText>
        <Styled.UserDescription data-testid={'user-description'}>
          {description}
        </Styled.UserDescription>
        <Divider />
        <Styled.UserText variant="h4" data-testid={'interests-user-text'}>
          Interests
        </Styled.UserText>
        <Styled.UserInterests data-testid={'user-interests'}>
          {interests &&
            interests.map((interest) => (
              <Chip
                avatar={<Avatar>{interest.emoji}</Avatar>}
                key={interest.id}
                label={interest.name}
                variant="outlined"
                style={{ textTransform: 'capitalize' }}
                onClick={handleClick}
                data-testid={'interest-chip'}
              />
            ))}
        </Styled.UserInterests>
      </Styled.ProfileDetailsContainer>
    </Modal>
  );
};
