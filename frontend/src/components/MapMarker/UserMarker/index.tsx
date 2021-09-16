import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { getEmojis } from '../../../utils/getEmojis';
import { UserProps } from '../../../utils/types';
import { ImageIconButton, TriangleDiv } from '../MapMarker.styled';
import { ImageAvatar, InterestTypography } from './UserMapMarker.styled';

type UserMapMarkerProps = {
  lat: number;
  lng: number;
  key: number;
  user: UserProps;
  onClick: () => void;
};

const UserMapMarker = (props: UserMapMarkerProps): JSX.Element => {
  const { user, onClick } = props;
  const { user: currentUser } = useContext(UserContext);
  const { interests, testingGroup } = currentUser;

  const handleClick = (event: React.MouseEvent) => {
    onClick();
    event.stopPropagation();
  };

  const displayEmojis = getEmojis(interests, user.interests, testingGroup);

  return (
    <>
      {/* triangle that points towards the location */}
      <TriangleDiv $isUser={user === currentUser} />

      {/* button that contains the profile image */}
      <ImageIconButton $isUser={user === currentUser} onClick={handleClick}>
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
