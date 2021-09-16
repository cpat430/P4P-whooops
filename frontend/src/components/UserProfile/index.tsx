import { Avatar, Divider, Grid, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LeaveUserProfileAppEvent } from '../../utils/appEvent';
import { trackEvent } from '../../utils/trackEvent';
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
  profileUser: UserProps | null;
  onToggleIsFriend: () => void;
  onClose: () => void;
};

export const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { profileUser, onToggleIsFriend, onClose } = props;
  const { user } = useContext(UserContext);

  const handleClose = () => {
    if (profileUser) {
      trackEvent(new LeaveUserProfileAppEvent(profileUser));
    }
    onClose();
  };

  return (
    <Modal
      open={profileUser !== null}
      disableAutoFocus
      disableEnforceFocus
      onClose={handleClose}
      data-testid={'user-profile'}
    >
      {profileUser ? (
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
                alt={profileUser.firstName}
                src={profileUser.image}
                data-testid={'user-avatar'}
              />
            </Grid>
            <Grid item xs={12}>
              <UserNameTypography variant="h6" data-testid={'user-name'}>
                {profileUser.firstName + ' ' + profileUser.lastName}
              </UserNameTypography>
            </Grid>

            {user.id !== profileUser.id && (
              <Grid item xs={8}>
                <StyledFriendButton
                  className="styled-friend-button"
                  isFriend={user.friendIds.includes(profileUser.id)}
                  toggleIsFriend={onToggleIsFriend}
                />
              </Grid>
            )}

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
                {profileUser.description}
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
                {profileUser.interests &&
                  profileUser.interests.map((interest) => {
                    const inCommon = user.interests.some((userInterest) => {
                      return userInterest.id === interest.id;
                    });
                    return (
                      <Grid item key={interest.id}>
                        <CapitalisedChip
                          $inCommon={inCommon}
                          avatar={<Avatar>{interest.emoji}</Avatar>}
                          label={interest.name}
                          variant="outlined"
                          data-testid={'interest-chip'}
                        />
                      </Grid>
                    );
                  })}
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
