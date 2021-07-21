import React from 'react';
import { UserProps } from '../../utils/types';
import {
  ImageAvatar,
  ImageIconButton,
  InterestAvatar,
  InterestTypography,
  TriangleDiv,
} from './UserMapMarker.styled';

type UserMapMarkerProps = {
  lat: number;
  lng: number;
  key: number;
  user: UserProps;
  displayInterestBadge: boolean;
  onClick: () => void;
};
const UserMapMarker = ({
  user,
  displayInterestBadge,
  onClick,
}: UserMapMarkerProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent) => {
    onClick();
    event.stopPropagation();
  };

  // TODO we will have some way of determining which interest from 'user' to display
  const interestToDisplay =
    user.interests.length > 0
      ? user.interests[Math.floor(user.interests.length / 2)]
      : null;

  return (
    <>
      {/* triangle that points towards the location */}
      <TriangleDiv />

      {/* button that contains the profile image */}
      <ImageIconButton onClick={handleClick}>
        {/* profile image */}
        <ImageAvatar src={user.image} />
      </ImageIconButton>
      {/* displayed interest avatar */}
      {interestToDisplay && displayInterestBadge && (
        <InterestAvatar>
          <InterestTypography>{interestToDisplay.emoji}</InterestTypography>
        </InterestAvatar>
      )}
    </>
  );
};

export default UserMapMarker;
