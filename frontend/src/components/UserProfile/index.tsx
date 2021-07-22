import { Avatar, Chip, Divider, Modal } from '@material-ui/core';
import React from 'react';
import { UserProps } from '../../utils/types';
import * as Styled from './UserProfile.styled';

type UserProfileProps = {
  user: UserProps | null;
  onClose: () => void;
};

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { user, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    console.log('interest clicked');
  };

  return (
    <Modal
      open={user !== null}
      disableAutoFocus
      disableEnforceFocus
      onClose={handleClose}
      data-testid={'user-profile'}
    >
      {user ? (
        <Styled.ProfileDetailsContainer
          data-testid={'profile-details-container'}
        >
          <Styled.UserHeader data-testid={'user-header'}>
            <Styled.UserAvatar
              alt={user.firstName}
              src={user.image}
              data-testid={'user-avatar'}
            />
            <Styled.UserName data-testid={'user-name'}>
              {user.firstName}
            </Styled.UserName>
          </Styled.UserHeader>
          <Divider />
          <Styled.UserText variant="h4" data-testid={'bio-user-text'}>
            Bio
          </Styled.UserText>
          <Styled.UserDescription data-testid={'user-description'}>
            {user.description}
          </Styled.UserDescription>
          <Divider />
          <Styled.UserText variant="h4" data-testid={'interests-user-text'}>
            Interests
          </Styled.UserText>
          <Styled.UserInterests data-testid={'user-interests'}>
            {user.interests &&
              user.interests.map((interest) => (
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
          <Styled.UserText>
            Are you friends?: {user.isFriendsWithUser ? '👍' : '👎'}
          </Styled.UserText>
        </Styled.ProfileDetailsContainer>
      ) : (
        // If no user, return empty. This won't be seen anyway
        <></>
      )}
    </Modal>
  );
};
