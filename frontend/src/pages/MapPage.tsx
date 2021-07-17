import React from 'react';
import { IconButton } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { UserProfile } from '../components/UserProfile';
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
};

export type UserProps = {
  lat: number;
  lng: number;
  name: string;
  description: string;
  interests: Interest[];
};

const PersonMarker = (props: UserProps) => {
  const { lat, lng, name, description, interests } = props;
  return (
    <IconButton
      onClick={() => {
        alert(
          `Location: ${lat}, ${lng}, ${name}, ${description}, ${interests.map(
            (interest) => interest.name
          )}`
        );
      }}
    >
      <EmojiPeopleIcon />
    </IconButton>
  );
};

const MapPage = (): JSX.Element => {
  const [isProfileOpen, toggleProfile] = useState<boolean>(true);

  const { user1, user2 } = useDummyUsers();

  const toggleUserProfile = () => {
    toggleProfile(!isProfileOpen);
  };

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
    <div style={{ height: '100vh', width: '100%' }} data-testid={'map-page'}>
      <UserProfile
        isProfileOpen={isProfileOpen}
        toggleUserProfile={toggleUserProfile}
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* Sky Tower */}
        <PersonMarker {...user1} />
        {/* Flat */}
        <PersonMarker {...user2} />
      </GoogleMapReact>
    </div>
  );
};

export default MapPage;
