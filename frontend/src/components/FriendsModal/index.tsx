import React from 'react';
import { Avatar, Modal, Typography } from '@material-ui/core';
import {
  FriendsModalAppBar,
  FriendsModalContainer,
  TuneIcon,
  FriendsModalHeader,
  FriendsModalHeadingText,
  FriendsModalTab,
  FriendsModalTabs,
  FriendsModalUserPill,
  FriendsModalUsersContainer,
  FriendsPaper,
  FriendsContainer,
} from './FriendsModal.styled';
import { useState } from 'react';
import { dummyUsers } from '../../utils/dummyUsers';
import { Interest, UserProps } from '../../utils/types';
import { ChooseInterestsModal } from '../ChooseInterests';
import { dummyInterests } from '../../utils/dummyInterests';
import { interestInCommon } from '../../utils/interestInCommon';

type FriendsModalProps = {
  open: boolean;
  handleClose: () => void;
  setCurrentUser: (user: UserProps) => void;
  openChooseInterestsModal: boolean;
  setOpenChooseInterestModal: (openChooseInterestModal: boolean) => void;
};

export const FriendsModal = (props: FriendsModalProps): JSX.Element => {
  const { open, handleClose, setCurrentUser } = props;
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setCurrentTab(newValue);
  };

  const handleInterestClose = () => {
    setOpenChooseInterestsModal(false);
  };

  return (
    <FriendsContainer>
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
              <TuneIcon
                onClick={() => setOpenChooseInterestsModal(true)}
              ></TuneIcon>
            </FriendsModalAppBar>
            <FriendsModalUsersContainer>
              {dummyUsers.map(
                (user, index) =>
                  interestInCommon(user.interests, selectedInterests) &&
                  (currentTab === 0 ||
                    (currentTab === 1 && user.isFriendsWithUser)) && (
                    <FriendsModalUserPill
                      onClick={() => setCurrentUser(user)}
                      key={index}
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
      <ChooseInterestsModal
        open={openChooseInterestsModal}
        handleClose={handleInterestClose}
        allInterests={dummyInterests}
        value={selectedInterests}
        onChange={(value: Interest[]) => {
          // handle setting interests
          console.log(
            'Chosen filter interests: ' +
              value
                .map((v) => {
                  return v.name;
                })
                .join(',')
          );

          // update the user's interests
          setSelectedInterests(value);
        }}
      ></ChooseInterestsModal>
    </FriendsContainer>
  );
};
