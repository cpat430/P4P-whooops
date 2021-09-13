import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { FriendsModal } from '../../components/FriendsModal';
import LocationMapMarker from '../../components/MapMarker/LocationMarker';
import UserMapMarker from '../../components/MapMarker/UserMarker';
import { PersonaliseModal } from '../../components/PersonaliseModal';
import { UserProfile } from '../../components/UserProfile';
import { AppEventContext } from '../../contexts/AppEventContext';
import { EnvironmentContext } from '../../contexts/EnvironmentContext';
import { UserContext } from '../../contexts/UserContext';
import { images } from '../../user-profiles';
import { dummyInterests } from '../../utils/dummyInterests';
import {
  albertStreetCountdown,
  quayStreetCountdown,
  vicStreetCountdown,
} from '../../utils/locations';
import { UserProps } from '../../utils/types';
import { EditInterestFab, FriendsFab, MapDiv } from './MapPage.styled';

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
  const { userLocation, otherUsers, mapProps } = useContext(EnvironmentContext);

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

  const mapKey = process.env.REACT_APP_MAP_KEY;
  if (mapKey === undefined) {
    console.error('Map key is undefined');
  }
  console.log(user);

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
              onClick={() => {
                addEvent({ name: 'click-user-profile' });
                setOpenUserProfile(otherUser);
              }}
            />
          );
        })}
        <UserMapMarker
          key={-1}
          lat={userLocation.lat}
          lng={userLocation.lng}
          user={user}
          onClick={() => {
            addEvent({ name: 'click-user-profile' });
            setOpenUserProfile(user);
          }}
        />
        <LocationMapMarker
          key={-2}
          lat={quayStreetCountdown.lat}
          lng={quayStreetCountdown.lng}
          locationLetter="A"
          onClick={() => {
            addEvent({ name: 'click-location-marker' });
          }}
        />
        <LocationMapMarker
          key={-3}
          lat={vicStreetCountdown.lat}
          lng={vicStreetCountdown.lng}
          locationLetter="B"
          onClick={() => {
            addEvent({ name: 'click-location-marker' });
          }}
        />
        <LocationMapMarker
          key={-4}
          lat={albertStreetCountdown.lat}
          lng={albertStreetCountdown.lng}
          locationLetter="C"
          onClick={() => {
            addEvent({ name: 'click-location-marker' });
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

      <FriendsFab
        onClick={() => {
          setOpenFriendsModal(true);
        }}
      >
        <GroupIcon />
      </FriendsFab>

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
    </MapDiv>
  );
};

export default MapPage;
