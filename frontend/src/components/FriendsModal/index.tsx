import React from 'react';
import { Avatar, Modal, Typography } from '@material-ui/core';
import {
  FriendsModalAppBar,
  FriendsModalContainer,
  FriendsModalFilterIcon,
  FriendsModalHeader,
  FriendsModalHeadingText,
  FriendsModalTab,
  FriendsModalTabs,
  FriendsModalUserPill,
  FriendsModalUsersContainer,
  FriendsPaper,
} from './FriendsModal.styled';
import { useState } from 'react';
import { dummyUsers } from '../../utils/dummyUsers';
import { UserProps } from '../../utils/types';

type FriendsModalProps = {
  open: boolean;
  handleClose: () => void;
  setCurrentUser: (user: UserProps) => void;
};

export const FriendsModal = (props: FriendsModalProps): JSX.Element => {
  const { open, handleClose, setCurrentUser } = props;
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setCurrentTab(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
    >
      <FriendsPaper>
        <FriendsModalContainer>
          <FriendsModalHeader>
            <FriendsModalHeadingText>Users</FriendsModalHeadingText>
          </FriendsModalHeader>
          <FriendsModalAppBar>
            <FriendsModalTabs value={currentTab} onChange={handleChange}>
              <FriendsModalTab label="Nearby Users"></FriendsModalTab>
              <FriendsModalTab label="Friends"></FriendsModalTab>
            </FriendsModalTabs>
            <FriendsModalFilterIcon
              onClick={() => console.log('opening filter page')}
            ></FriendsModalFilterIcon>
          </FriendsModalAppBar>
          <FriendsModalUsersContainer>
            {dummyUsers.map(
              (user, index) =>
                (currentTab === 1 && user.isFriendsWithUser) || (
                  <FriendsModalUserPill
                    key={index}
                    onClick={() => setCurrentUser(user)}
                  >
                    <Avatar src={user.image} />
                    <Typography>{user.name}</Typography>
                    <Typography variant="h4">
                      {user.interests[0].emoji}
                    </Typography>
                  </FriendsModalUserPill>
                )
            )}
          </FriendsModalUsersContainer>
        </FriendsModalContainer>
      </FriendsPaper>
    </Modal>
  );
};
