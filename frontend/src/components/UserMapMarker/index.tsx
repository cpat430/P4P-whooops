import React from 'react';
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
  const interestEmojis = user.interests.map((interest) => {
    return interest.emoji;
  });

  const emojiLimit = 2;
  const displayEmojis =
    interestEmojis.length <= emojiLimit
      ? interestEmojis.concat()
      : interestEmojis
          .slice(0, emojiLimit)
          .concat('+' + (interestEmojis.length - 2).toString());

  // char code 160 is the no-break space (&nbsp;) - forces the emojis/numbers to stay on one line
  const displayString = displayEmojis.join(String.fromCharCode(160));
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
      {displayInterestBadge && displayEmojis.length > 0 && (
        <InterestTypography>{displayString}</InterestTypography>
      )}
    </>
  );
};

export default UserMapMarker;
