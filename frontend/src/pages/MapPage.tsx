import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { ChooseInterestsModal } from '../components/ChooseInterests';
import UserMapMarker from '../components/UserMapMarker';
import { UserProfile } from '../components/UserProfile';
import { dummyInterests } from '../utils/dummyInterests';
import { useDummyUsers } from '../utils/dummyUsers';

/**
 * Any React Component that is rendered on the map must
 * accept {lat, lng} in its props, which indicates where
 * it will be rendered on the map
 *
 * Also, the coordinate is the top-left position, not the center
 */

export type Interest = {
  id: number;
  name: string;
  emoji: string;
};

export type UserProps = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  image: string;
  description: string;
  interests: Interest[];
};

const allInterests = dummyInterests;

const MapPage = (): JSX.Element => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(true);

  const dummyUsers = useDummyUsers();
  const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps);
  const [openChooseInterestsModal, setOpenChooseInterestsModal] =
    useState(true);
  const [interests, setInterests] = useState<Interest[]>(
    allInterests.filter(() => {
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
    <div style={{ height: '100vh', width: '100%' }} data-testid={'map-page'}>
      <UserProfile
        user={currentUser}
        isProfileOpen={isProfileOpen}
        toggleProfile={toggleProfile}
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {dummyUsers.map((user, userIndex) => {
          return (
            <UserMapMarker
              key={userIndex}
              lat={user.lat}
              lng={user.lng}
              user={user}
              onClick={() => {
                setCurrentUser(user);
              }}
            />
          );
        })}
        {/* Sky Tower */}
      </GoogleMapReact>

      <ChooseInterestsModal
        open={openChooseInterestsModal}
        handleClose={() => {
          setOpenChooseInterestsModal(false);
        }}
        allInterests={allInterests}
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
    </div>
  );
};

export default MapPage;
