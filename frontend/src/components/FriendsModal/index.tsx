import { Avatar, Divider, Grid, Modal, Typography } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import React, { useContext, useState } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { UserContext } from '../../contexts/UserContext';
import { dummyInterests } from '../../utils/dummyInterests';
import { getEmojis } from '../../utils/getEmojis';
import { Interest, UserProps } from '../../utils/types';
import { InterestChip } from '../InterestChip';
import {
  FilterInterestPaper,
  FriendPillButton,
  FriendsModalAppBar,
  FriendsModalContainer,
  FriendsModalTab,
  FriendsModalTabs,
  FriendsPaper,
  FriendsTuneFab,
} from './FriendsModal.styled';

type FriendsModalProps = {
  open: boolean;
  handleClose: () => void;
  setCurrentUser: (user: UserProps) => void;
  openChooseInterestsModal: boolean;
  setOpenChooseInterestModal: (openChooseInterestModal: boolean) => void;
};

export const FriendsModal = ({
  open,
  handleClose,
  setCurrentUser,
}: FriendsModalProps): JSX.Element => {
  const { user } = useContext(UserContext);
  const {
    challenge: { otherUsers },
  } = useContext(ChallengeContext);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [filterInterests, setFilterInterests] = useState<Interest[]>([]);
  const [openInterestFilterModal, setOpenInterestFilterModal] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setCurrentTab(newValue);
  };

  const handleInterestClose = () => {
    setOpenInterestFilterModal(false);
  };

  // All users or only friends
  const relevantUsers =
    currentTab === 0
      ? otherUsers
      : otherUsers.filter((otherUser) => {
          return user.friendIds.includes(otherUser.id);
        });

  // Filter by interest
  const displayUsers =
    filterInterests.length === 0
      ? relevantUsers
      : relevantUsers.filter((relevantUser) => {
          return filterInterests.find((filterInterest) => {
            return relevantUser.interests.find((relevantUserInterest) => {
              return filterInterest.id === relevantUserInterest.id;
            });
          });
        });

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
              setOpenInterestFilterModal(true);
            }}
          >
            <TuneIcon />
          </FriendsTuneFab>

          <FriendsModalContainer>
            {displayUsers.map((otherUser, index) => {
              return (
                <FriendPillButton
                  fullWidth
                  onClick={() => setCurrentUser(otherUser)}
                  key={index}
                >
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={3}>
                      <Avatar src={otherUser.image} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{`${otherUser.firstName} ${otherUser.lastName}`}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{getEmojis(otherUser.interests)}</Typography>
                    </Grid>
                  </Grid>
                </FriendPillButton>
              );
            })}
          </FriendsModalContainer>
        </FriendsPaper>
      </Modal>
      <Modal
        open={openInterestFilterModal}
        onClose={handleInterestClose}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <FilterInterestPaper>
          <Grid container spacing={1} style={{ padding: '1rem' }}>
            <Grid item xs={12}>
              <Typography>Filter by Interests</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {dummyInterests.map((interest, index) => {
              const filterInterestIndex = filterInterests.findIndex(
                (filterInterest) => {
                  return filterInterest.id === interest.id;
                }
              );

              return (
                <Grid item key={index}>
                  <InterestChip
                    interest={interest}
                    checked={filterInterestIndex !== -1}
                    onClick={() => {
                      if (filterInterestIndex === -1) {
                        setFilterInterests(filterInterests.concat(interest));
                      } else {
                        setFilterInterests(
                          filterInterests.filter((_interest, filterIndex) => {
                            return filterIndex !== filterInterestIndex;
                          })
                        );
                      }
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </FilterInterestPaper>
      </Modal>
    </>
  );
};
