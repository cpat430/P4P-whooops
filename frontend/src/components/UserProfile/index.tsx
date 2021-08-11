import { Avatar, Divider, Grid, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { UserProps } from '../../utils/types';
import {
  CapitalisedChip,
  CloseIconButton,
  ProfileDetailsPaper,
  ProfileGrid,
  StyledFriendButton,
  UserAvatar,
  UserNameTypography,
} from './UserProfile.styled';

type UserProfileProps = {
  user: UserProps | null;
  onToggleIsFriend: () => void;
  onClose: () => void;
};

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { user, onToggleIsFriend, onClose } = props;

  const handleClose = () => {
    onClose();
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
        <ProfileDetailsPaper data-testid={'profile-details-container'}>
          <CloseIconButton onClick={handleClose}>
            <CloseIcon />
          </CloseIconButton>
          <ProfileGrid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <UserAvatar
                alt={user.firstName}
                src={user.image}
                data-testid={'user-avatar'}
              />
            </Grid>
            <Grid item xs={12}>
              <UserNameTypography variant="h6" data-testid={'user-name'}>
                {user.firstName + ' ' + user.lastName}
              </UserNameTypography>
            </Grid>

            <Grid item xs={8}>
              <StyledFriendButton
                className="styled-friend-button"
                isFriend={user.isFriendsWithUser}
                toggleIsFriend={onToggleIsFriend}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h6"
                data-testid={'bio-user-text'}
              >
                Bio
              </Typography>
              <Typography data-testid={'user-description'}>
                {user.description}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h6"
                data-testid={'interests-user-text'}
              >
                Interests
              </Typography>
              <Grid container spacing={1} data-testid={'user-interests'}>
                {user.interests &&
                  user.interests.map((interest) => (
                    <Grid item key={interest.id}>
                      <CapitalisedChip
                        avatar={<Avatar>{interest.emoji}</Avatar>}
                        label={interest.name}
                        variant="outlined"
                        style={{ textTransform: 'capitalize' }}
                        data-testid={'interest-chip'}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </ProfileGrid>
        </ProfileDetailsPaper>
      ) : (
        // If no user, return empty. This won't be seen anyway
        <></>
      )}
    </Modal>
  );
};
