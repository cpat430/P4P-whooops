import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { ChallengeButton } from '../../components/ChallengeButton';
import { ChallengeHelperModal } from '../../components/ChallengeHelperModal';
import { ChooseInterestsModal } from '../../components/ChooseInterests';
import { FriendsModal } from '../../components/FriendsModal';
import UserMapMarker from '../../components/UserMapMarker';
import { UserProfile } from '../../components/UserProfile';
import { AppEventContext } from '../../contexts/AppEventContext';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import { dummyInterests } from '../../utils/dummyInterests';
import { dummyUsers } from '../../utils/dummyUsers';
import { Interest, UserProps } from '../../utils/types';
import { EditInterestFab, FriendsFab, MapDiv } from './MapPage.styled';

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
    useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
  const [openChallengeHelperModal, setOpenChallengeHelperModal] =
    useState(false);

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

      <FriendsFab
        onClick={() => {
          setOpenFriendsModal(true);
        }}
      >
        Friends
      </FriendsFab>

      <ChallengeButton
        onClick={() => {
          setOpenChallengeHelperModal(true);
        }}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '11rem',
        }}
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
    </MapDiv>
  );
};

export default MapPage;
