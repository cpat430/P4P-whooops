import { Avatar, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { UserProps } from '../../utils/types';

// Constants that can change the marker
const triangleWidth = 25;
const triangleHeight = triangleWidth * 1.7;
const circleRadius = triangleWidth;

const interestCircleRadius = 25;
const interestCircleBackgroundColor = '#777';
const interestFontSize = 13;

const markerColor = '#555';
const imagePadding = 8;

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
      ? user.interests[Math.floor(Math.random() * user.interests.length)]
      : null;

  return (
    <>
      {/* triangle */}
      <div
        style={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          borderTop: `${triangleHeight}px solid ${markerColor}`,
          borderBottom: `${triangleHeight}px solid transparent`,

          borderLeft: `${triangleWidth}px solid transparent`,
          borderRight: `${triangleWidth}px solid transparent`,
        }}
      />
      {/* outside circle */}
      <div
        style={{
          position: 'absolute',
          top: -triangleHeight,
          left: 0,
          transform: 'translate(-50%, -50%)',
          height: circleRadius * 2,
          width: circleRadius * 2,
          borderRadius: 9999,
          backgroundColor: markerColor,
        }}
      >
        {/* inside circle */}
        <IconButton
          style={{
            height: '100%',
            width: '100%',
            padding: imagePadding,
          }}
          onClick={handleClick}
        >
          <img src={user.image} width={'100%'} style={{ borderRadius: 9999 }} />
        </IconButton>
      </div>
      {/* interest badge */}
      {displayInterestBadge && interestToDisplay && (
        <Avatar
          style={{
            position: 'absolute',
            // places the avatar to the bottom-right edge of the circle
            top: -triangleHeight + circleRadius * Math.sin(Math.PI / 4),
            left: circleRadius * Math.sin(Math.PI / 4),
            transform: 'translate(-50%, -50%)',
            height: interestCircleRadius,
            width: interestCircleRadius,
            borderRadius: 9999,
            backgroundColor: interestCircleBackgroundColor,
          }}
        >
          <Typography style={{ fontSize: interestFontSize }}>
            {interestToDisplay.emoji}
          </Typography>
        </Avatar>
      )}
    </>
  );
};

export default UserMapMarker;
