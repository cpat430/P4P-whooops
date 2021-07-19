import React from 'react';
import {
  Avatar,
  Chip,
  Divider,
  Modal,
  styled,
  Typography,
} from '@material-ui/core';
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
  const { lat, lng, name, description, interests } = user;
  const { isProfileOpen, toggleProfile } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(lat, lng, name, description, interests);

  const handleClose = () => {
    toggleProfile();
  };

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
  }, [user]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <Modal
      open={isProfileOpen}
      disableAutoFocus
      disableEnforceFocus
      onClose={handleClose}
    >
      <Styled.ProfileDetailsContainer>
        <Styled.UserHeader>
          <Styled.UserAvatar alt={user.name} src="default_avatar.png" />
          <Styled.UserName>{user.name}</Styled.UserName>
        </Styled.UserHeader>
        <Divider />
        <Styled.UserText variant="h4">Bio</Styled.UserText>
        <Styled.UserDescription>{user.description}</Styled.UserDescription>
        <Divider />
        <Styled.UserText variant="h4">Interests</Styled.UserText>
        {interests.map((interest) => (
          <Chip
            avatar={<Avatar>{interest.emoji}</Avatar>}
            key={interest.id}
            label="basic"
            variant="outlined"
          />
        ))}
      </Styled.ProfileDetailsContainer>
    </Modal>
  );
};
