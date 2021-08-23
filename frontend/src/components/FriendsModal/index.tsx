import { Avatar, Grid, Modal, Typography } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import React, { useContext, useState } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { dummyInterests } from '../../utils/dummyInterests';
import { getEmojis } from '../../utils/getEmojis';
import { interestInCommon } from '../../utils/interestInCommon';
import { Interest, UserProps } from '../../utils/types';
import { ChooseInterestsModal } from '../ChooseInterests';
import {
  FriendPillButton,
  FriendsModalAppBar,
  FriendsModalContainer,
  FriendsModalTab,
  FriendsModalTabs,
  FriendsPaper,
  FriendsTuneFab
} from './FriendsModal.styled';

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

  const { challenge } = useContext(ChallengeContext);
  const { dummyUsers } = challenge;

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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <FriendsPaper>
          <FriendsModalAppBar>
            <FriendsModalTabs value={currentTab} onChange={handleChange}>
              <FriendsModalTab label="All Users"></FriendsModalTab>
              <FriendsModalTab label="Friends"></FriendsModalTab>
            </FriendsModalTabs>
          </FriendsModalAppBar>

          <FriendsTuneFab
            onClick={() => {
              setOpenChooseInterestsModal(true);
            }}
          >
            <TuneIcon />
          </FriendsTuneFab>

          <FriendsModalContainer>
            {dummyUsers.map(
              (user, index) =>
                interestInCommon(user.interests, selectedInterests) &&
                (currentTab === 0 ||
                  (currentTab === 1 && user.isFriendsWithUser)) && (
                  <FriendPillButton
                    fullWidth
                    onClick={() => setCurrentUser(user)}
                    key={index}
                  >
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Avatar src={user.image} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>{getEmojis(user.interests)}</Typography>
                      </Grid>
                    </Grid>
                  </FriendPillButton>
                )
            )}
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
    </>
  );
};
