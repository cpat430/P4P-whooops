import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getEmojis } from '../../utils/getEmojis';
import { UserProps } from '../../utils/types';
import {
  ImageAvatar,
  ImageIconButton,
  InterestTypography,
  TriangleDiv,
} from './UserMapMarker.styled';

type UserMapMarkerProps = {
  lat: number;
  lng: number;
  key: number;
  user: UserProps;
  onClick: () => void;
};
const UserMapMarker = ({ user, onClick }: UserMapMarkerProps): JSX.Element => {
  const { user: currentUser } = useContext(UserContext);

  const { interests, group } = currentUser;

  const handleClick = (event: React.MouseEvent) => {
    onClick();
    event.stopPropagation();
  };

  const displayEmojis = getEmojis(interests, user.interests, group);

  return (
    <>
      {/* triangle that points towards the location */}
      <TriangleDiv isUser={user === currentUser} />

      {/* button that contains the profile image */}
      <ImageIconButton isUser={user === currentUser} onClick={handleClick}>
        {/* profile image */}
        <ImageAvatar src={user.image} />
      </ImageIconButton>
      {/* displayed interest avatar */}
      {displayEmojis && displayEmojis.length > 0 && (
        <InterestTypography>{displayEmojis}</InterestTypography>
      )}
    </>
  );
};

export default UserMapMarker;
