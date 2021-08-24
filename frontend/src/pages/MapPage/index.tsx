import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { ChallengeHelperModal } from '../../components/ChallengeHelperModal';
import { FeedbackModal } from '../../components/FeedbackModal';
import { FriendsModal } from '../../components/FriendsModal';
import { PersonaliseModal } from '../../components/PersonaliseModal';
import UserMapMarker from '../../components/UserMapMarker';
import { UserProfile } from '../../components/UserProfile';
import { AppEventContext } from '../../contexts/AppEventContext';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { UserContext } from '../../contexts/UserContext';
import { images } from '../../user-profiles';
import { createFeedback } from '../../utils/createFeedback';
import { dummyInterests } from '../../utils/dummyInterests';
import { getRandomQuestion } from '../../utils/dummyQuestions';
import { UserProps } from '../../utils/types';
import {
  EditInterestFab,
  FeedbackFab,
  FriendsFab,
  MapDiv,
  StyledChallengeButton,
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
    challenge: { otherUsers, mapProps, modalContent },
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

  const [openUserProfile, setOpenUserProfile] = useState<UserProps | null>(
    null
  );

  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState<boolean>(true); // initially, choose interests modal is open
  const [openFriendsModal, setOpenFriendsModal] = useState<boolean>(false);
  const [openChallengeHelperModal, setOpenChallengeHelperModal] =
    useState<boolean>(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);

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
        profileUser={openUserProfile}
        onToggleIsFriend={() => {
          handleToggleIsFriend(openUserProfile);
        }}
        onClose={() => {
          // to close the modal, set the current user to null
          setOpenUserProfile(null);
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
        {otherUsers.map((otherUser, userIndex) => {
          return (
            <UserMapMarker
              key={userIndex}
              lat={otherUser.lat}
              lng={otherUser.lng}
              user={otherUser}
              displayInterestBadge={true}
              onClick={() => {
                addEvent({ name: 'click-user-profile' });
                setOpenUserProfile(otherUser);
              }}
            />
          );
        })}
        <UserMapMarker
          key={-1}
          lat={user.lat}
          lng={user.lng}
          user={user}
          displayInterestBadge={true}
          onClick={() => {
            addEvent({ name: 'click-user-profile' });
            setOpenUserProfile(user);
          }}
        />
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
        allImages={images}
        allInterests={dummyInterests}
        value={user}
        onChange={(value) => {
          const { interests, image } = value;

          // update the user's interests and image
          setUser({ ...user, interests, image });
        }}
      ></PersonaliseModal>

      <FriendsModal
        open={openFriendsModal}
        handleClose={() => {
          setOpenFriendsModal(false);
        }}
        setCurrentUser={setOpenUserProfile}
        openChooseInterestsModal={openChooseInterestsModal}
        setOpenChooseInterestModal={setOpenChooseInterestsModal}
      ></FriendsModal>

      <ChallengeHelperModal
        open={openChallengeHelperModal}
        handleClose={() => {
          setOpenChallengeHelperModal(false);
        }}
      >
        {modalContent}
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
