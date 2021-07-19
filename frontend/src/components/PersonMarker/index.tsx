import React from 'react';
import { IconButton } from '@material-ui/core';
import { UserProps } from '../../pages/MapPage';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

type CoordProps = {
  lat: number;
  lng: number;
};

type PersonMarkerProps = {
  user: UserProps;
  setCurrentUser: (user: UserProps) => void;
};

export const PersonMarker = (
  props: CoordProps & PersonMarkerProps
): JSX.Element => {
  const { user, setCurrentUser } = props;

  return (
    <IconButton
      onClick={() => {
        setCurrentUser(user);
      }}
    >
      <EmojiPeopleIcon />
    </IconButton>
  );
};
