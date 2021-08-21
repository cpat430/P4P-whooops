import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { ChallengeHelperModal } from '../../components/ChallengeHelperModal';
import { ChooseInterestsModal } from '../../components/ChooseInterests';
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
import { dummyUsers } from '../../utils/dummyUsers';
import { Interest, UserProps } from '../../utils/types';
import {
  EditInterestFab,
  FeedbackFab,
  FriendsFab,
  MapDiv,
  StyledChallengeButton,
} from './MapPage.styled';

const mapOptions = (maps: GoogleMapReact.Maps) => {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
  };
};

const MapPage = (): JSX.Element => {
  const { addAppEvent: addEvent } = useContext(AppEventContext);
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState<UserProps[]>(dummyUsers);

  const handleToggleIsFriend = (user: UserProps | null): void => {
    if (!user) return;

    setUsers(
      users.map((u) => {
        if (u.id === user.id) {
          u.isFriendsWithUser = !u.isFriendsWithUser;
        }
        return u;
      })
    );
  };

  /**
   * currentUser is the current profile that is open.
   * If currentUser === null, the modal is not open
   */
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState<boolean>(false);
  const [openFriendsModal, setOpenFriendsModal] = useState<boolean>(false);
  const [openChallengeHelperModal, setOpenChallengeHelperModal] =
    useState<boolean>(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);

  const [interests, setInterests] = useState<Interest[]>(
    dummyInterests.filter(() => {
      return Math.random() < 0.5;
    })
  );

  const { challenge } = useContext(ChallengeContext);

  const mapKey = process.env.REACT_APP_MAP_KEY;
  if (mapKey === undefined) {
    console.error('Map key is undefined');
  }

  const defaultProps = {
    // OGGB
    center: {
      lat: -36.8531,
      lng: 174.7715,
    },
    zoom: 14,
  };

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
        user={currentUser}
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
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
      >
        {dummyUsers.map((user, userIndex) => {
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
          addEvent({ name: 'Edit interest clicked' });
          setOpenChooseInterestsModal(true);
        }}
      >
        Edit Interest
      </EditInterestFab>

      <FriendsFab onClick={() => setOpenFriendsModal(true)}>Friends</FriendsFab>

      <FeedbackFab onClick={() => setOpenFeedbackModal(true)}>
        Give Feedback
      </FeedbackFab>

      <StyledChallengeButton
        className="challenge-button"
        onClick={() => setOpenChallengeHelperModal(true)}
      />

      <ChooseInterestsModal
        open={openChooseInterestsModal}
        handleClose={() => {
          setOpenChooseInterestsModal(false);
        }}
        allInterests={dummyInterests}
        value={interests}
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
          setInterests(value);
        }}
      ></ChooseInterestsModal>

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
        helperMessage={challenge.helperMessage}
      ></ChallengeHelperModal>

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
