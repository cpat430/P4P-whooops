import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useEffect, useState } from 'react';
import { FriendsModal } from '../../components/FriendsModal';
import LocationMapMarker from '../../components/MapMarker/LocationMarker';
import UserMapMarker from '../../components/MapMarker/UserMarker';
import { PersonaliseModal } from '../../components/PersonaliseModal';
import { UserProfile } from '../../components/UserProfile';
import { EnvironmentContext } from '../../contexts/EnvironmentContext';
import { UserContext } from '../../contexts/UserContext';
import { images } from '../../user-profiles';
import {
  AddToPathAppEvent,
  ClickAddFriendButton,
  ClickRemoveFriendButton,
  ClickUserProfileAppEvent,
} from '../../utils/appEvent';
import { allInterests } from '../../utils/interests';
import { trackEvent } from '../../utils/trackEvent';
import { LatLng, UserProps } from '../../utils/types';
import { EditInterestFab, FriendsFab, MapDiv } from './MapPage.styled';

const mapOptions = (maps: GoogleMapReact.Maps) => {
  return {
    clickableIcons: false, // The user cannot click on objects in the map
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
    },
  };
};

const MapPage = (): JSX.Element => {
  const { user, setUser } = useContext(UserContext);
  const { startingLocation, otherUsers, locationMarkerLocations } =
    useContext(EnvironmentContext);

  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);

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

  const addToPath = (latlng: LatLng) => {
    trackEvent(new AddToPathAppEvent(latlng));
    setPath((path) => {
      return path.concat(latlng);
    });
  };

  useEffect(() => {
    setPath([startingLocation]);
  }, [startingLocation]);

  useEffect(() => {
    if (map && maps) {
      const feature = map.data.add({
        geometry: new maps.Data.LineString(path),
      });
      return () => {
        map.data.remove(feature);
      };
    }
  }, [map, maps, path]);

  const handleToggleIsFriend = (otherUser: UserProps | null): void => {
    if (!otherUser) return;

    if (user.friendIds.includes(otherUser.id)) {
      trackEvent(new ClickRemoveFriendButton(otherUser));
    } else {
      trackEvent(new ClickAddFriendButton(otherUser));
    }

    const newFriendIds = user.friendIds.includes(otherUser.id)
      ? user.friendIds.filter((id) => {
          return id !== otherUser.id;
        })
      : user.friendIds.concat(otherUser.id);
    setUser({ ...user, friendIds: newFriendIds });
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
        center={startingLocation}
        zoom={20}
        onGoogleApiLoaded={({ map, maps }) => {
          map.addListener('dblclick', (event: any) => {
            addToPath({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          });
          setMap(map);
          setMaps(maps);
        }}
      >
        {otherUsers.map((otherUser, userIndex) => {
          return (
            <UserMapMarker
              key={userIndex}
              lat={otherUser.lat}
              lng={otherUser.lng}
              user={otherUser}
              onClick={() => {
                setOpenUserProfile(otherUser);
                trackEvent(new ClickUserProfileAppEvent(otherUser));
              }}
            />
          );
        })}
        {locationMarkerLocations.map((locationMarkerLocation, index) => {
          return (
            <LocationMapMarker
              key={-2 - index}
              lat={locationMarkerLocation.lat}
              lng={locationMarkerLocation.lng}
              locationLetter={String.fromCharCode('A'.charCodeAt(0) + index)}
              onClick={() => {
                // TODO
                addToPath(locationMarkerLocation);
              }}
            />
          );
        })}
        <UserMapMarker
          key={-1}
          lat={startingLocation.lat}
          lng={startingLocation.lng}
          user={user}
          onClick={() => {
            setOpenUserProfile(user);
          }}
        />
      </GoogleMapReact>

      {/* Temporary way to open edit interests modal */}
      <EditInterestFab
        onClick={() => {
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
        allInterests={allInterests}
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
