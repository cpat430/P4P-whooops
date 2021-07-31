import { Avatar, Chip, Divider, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { UserProps } from '../../utils/types';
import * as Styled from './UserProfile.styled';

type UserProfileProps = {
  user: UserProps;
  isProfileOpen: boolean;
  setCurrentUser: (user: UserProps) => void;
  handleUpdateFriend: (index: number) => void;
};

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { user } = props;
  const {
    index,
    firstName,
    lastName,
    description,
    interests,
    isFriendsWithUser,
  } = user;
  const { isProfileOpen, setCurrentUser, handleUpdateFriend } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClose = () => {
    setCurrentUser({} as UserProps);
  };

  const handleClick = () => {
    console.log('interest clicked');
  };

  useEffect(() => {
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
            alt={firstName}
            src={user.image}
            data-testid={'user-avatar'}
          />
          <Styled.UserName
            data-testid={'user-name'}
          >{`${firstName} ${lastName}`}</Styled.UserName>
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
        <Styled.UserText>
          Are you friends?: {isFriendsWithUser ? '👍' : '👎'}
        </Styled.UserText>
        {!isFriendsWithUser ? (
          <Styled.UserAddFriendContainer>
            <Styled.UserAddFriendButton
              onClick={() => handleUpdateFriend(index)}
            >
              Add Friend
            </Styled.UserAddFriendButton>
          </Styled.UserAddFriendContainer>
        ) : (
          <Styled.UserAddFriendContainer>
            <Styled.UserAddFriendButton
              onClick={() => handleUpdateFriend(index)}
            >
              Remove Friend
            </Styled.UserAddFriendButton>
          </Styled.UserAddFriendContainer>
        )}
      </Styled.ProfileDetailsContainer>
    </Modal>
  );
};
