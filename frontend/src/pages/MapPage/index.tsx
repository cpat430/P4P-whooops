import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { ChallengeHelperModal } from '../../components/ChallengeHelperModal';
import { PersonaliseModal } from '../../components/PersonaliseModal';
import { FeedbackModal } from '../../components/FeedbackModal';
import { FriendsModal } from '../../components/FriendsModal';
import UserMapMarker from '../../components/UserMapMarker';
import { UserProfile } from '../../components/UserProfile';
import { AppEventContext } from '../../contexts/AppEventContext';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { UserContext } from '../../contexts/UserContext';
import { createFeedback } from '../../utils/createFeedback';
import { dummyInterests } from '../../utils/dummyInterests';
import { getRandomQuestion } from '../../utils/dummyQuestions';
import { Interest, UserProps } from '../../utils/types';
import {
  EditInterestFab,
  FeedbackFab,
  FriendsFab,
  MapDiv,
  StyledChallengeButton
} from './MapPage.styled';

const mapOptions = (maps: GoogleMapReact.Maps) => {
  return {
    clickableIcons: false, // The user cannot click on objects in the map
    fullscreenControl: false,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
    },
  };
};

const MapPage = (): JSX.Element => {
  const { addAppEvent: addEvent } = useContext(AppEventContext);
  const { user, setUser } = useContext(UserContext);
  const {
    challenge: { otherUsers, mapProps },
  } = useContext(ChallengeContext);

  const handleToggleIsFriend = (otherUser: UserProps | null): void => {
    if (!otherUser) return;

    const newFriendIds = user.friendIds.includes(otherUser.id)
      ? user.friendIds.filter((id) => {
          return id !== otherUser.id;
        })
      : user.friendIds.concat(otherUser.id);
    setUser({ ...user, friendIds: newFriendIds });
  };

  /**
   * currentUser is the current profile that is open.
   * If currentUser === null, the modal is not open
   */
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState<boolean>(true); // initially, choose interests modal is open
  const [openFriendsModal, setOpenFriendsModal] = useState<boolean>(false);
  const [openChallengeHelperModal, setOpenChallengeHelperModal] =
    useState<boolean>(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);

  const { challenge } = useContext(ChallengeContext);

  const mapKey = process.env.REACT_APP_MAP_KEY;
  if (mapKey === undefined) {
    console.error('Map key is undefined');
  }

  const onFeedbackSubmit = (
    question: string,
    rating: number,
    answer?: string
  ) => {
    const { id, email } = user;

    createFeedback({ id, email, question, answer, rating });
    setOpenFeedbackModal(false);
  };

  return (
    <MapDiv data-testid={'map-page'}>
      <UserProfile
        profileUser={currentUser}
        onToggleIsFriend={() => {
          handleToggleIsFriend(currentUser);
        }}
        onClose={() => {
          // to close the modal, set the current user to null
          setCurrentUser(null);
        }}
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey || '' }}
        options={mapOptions}
        defaultCenter={mapProps.center}
        defaultZoom={mapProps.zoom}
        center={mapProps.center}
        zoom={mapProps.zoom}
      >
        {otherUsers.map((user, userIndex) => {
          return (
            <UserMapMarker
              key={userIndex}
              lat={user.lat}
              lng={user.lng}
              user={user}
              displayInterestBadge={true}
              onClick={() => {
                addEvent({ name: 'click-user-profile' });
                setCurrentUser(user);
              }}
            />
          );
        })}
      </GoogleMapReact>

      {/* Temporary way to open edit interests modal */}
      <EditInterestFab
        onClick={() => {
          addEvent({ name: 'click-edit-interest' });
          setOpenChooseInterestsModal(true);
        }}
      >
        <EditIcon />
      </EditInterestFab>

      <FeedbackFab onClick={() => setOpenFeedbackModal(true)}>
        Give Feedback
      </FeedbackFab>

      <FriendsFab
        onClick={() => {
          setOpenFriendsModal(true);
        }}
      >
        <GroupIcon />
      </FriendsFab>

      <StyledChallengeButton
        className="challenge-button"
        onClick={() => setOpenChallengeHelperModal(true)}
      />

      <PersonaliseModal
        open={openChooseInterestsModal}
        handleClose={() => {
          setOpenChooseInterestsModal(false);
        }}
        allInterests={dummyInterests}
        value={user.interests}
        onChange={(value: Interest[]) => {
          // handle setting interests
          console.log(
            'Chose interests: ' +
              value
                .map((v) => {
                  return v.name;
                })
                .join(',')
          );

          // update the user's interests
          setUser({ ...user, interests: value });
        }}
      ></PersonaliseModal>

      <FriendsModal
        open={openFriendsModal}
        handleClose={() => {
          setOpenFriendsModal(false);
        }}
        setCurrentUser={setCurrentUser}
        openChooseInterestsModal={openChooseInterestsModal}
        setOpenChooseInterestModal={setOpenChooseInterestsModal}
      ></FriendsModal>

      <ChallengeHelperModal
        open={openChallengeHelperModal}
        handleClose={() => {
          setOpenChallengeHelperModal(false);
        }}
      >
        {challenge.modalContent}
      </ChallengeHelperModal>

      <FeedbackModal
        open={openFeedbackModal}
        handleClose={() => setOpenFeedbackModal(false)}
        question={getRandomQuestion()}
        onSubmit={onFeedbackSubmit}
      ></FeedbackModal>
    </MapDiv>
  );
};

export default MapPage;
