import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { ChooseInterestsModal } from '../../components/ChooseInterests';
import { FriendsModal } from '../../components/FriendsModal';
import UserMapMarker from '../../components/UserMapMarker';
import { UserProfile } from '../../components/UserProfile';
import { dummyInterests } from '../../utils/dummyInterests';
import { dummyUsers } from '../../utils/dummyUsers';
import { Interest, UserProps } from '../../utils/types';
import { EditInterestFab, MapDiv, FriendsFab } from './MapPage.styled';

const mapOptions = (maps: GoogleMapReact.Maps) => {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
  };
};

const MapPage = (): JSX.Element => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps);
  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState(true);
  const [openFriendsModal, setOpenFriendsModal] = useState(true);
  const [interests, setInterests] = useState<Interest[]>(
    dummyInterests.filter(() => {
      return Math.random() < 0.5;
    })
  );

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

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    toggleProfile();
  }, [currentUser]);

  return (
    <MapDiv data-testid={'map-page'}>
      <UserProfile
        user={currentUser}
        isProfileOpen={isProfileOpen}
        setCurrentUser={setCurrentUser}
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
      ></FriendsModal>
    </MapDiv>
  );
};

export default MapPage;
