import GoogleMapReact from 'google-map-react';
import React, { useContext, useState } from 'react';
import { ChooseInterestsModal } from '../../components/ChooseInterests';
import { FriendsModal } from '../../components/FriendsModal';
import UserMapMarker from '../../components/UserMapMarker';
import { UserProfile } from '../../components/UserProfile';
import { EventContext } from '../../contexts/EventContext';
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
  const { addEvent } = useContext(EventContext);

  /**
   * currentUser is the current profile that is open.
   * If currentUser === null, the modal is not open
   */
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
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

  return (
    <MapDiv data-testid={'map-page'}>
      <UserProfile
        user={currentUser}
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
    </MapDiv>
  );
};

export default MapPage;
