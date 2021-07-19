import { IconButton } from '@material-ui/core';
import React from 'react';

type User = {
  emoji: string;
  image: string;
};
type UserMapMarkerProps = {
  lat: number;
  lng: number;
  user: User;
};
const UserMapMarker = ({ user }: UserMapMarkerProps): JSX.Element => {
  const ratio = 1.7;
  const triangleWidth = 30;
  const triangleHeight = triangleWidth * ratio;

  const circleRadius = triangleWidth;

  const markerColor = '666';
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
            padding: 5,
          }}
        >
          <img src={user.image} width={'100%'} style={{ borderRadius: 9999 }} />
        </IconButton>
      </div>
    </>
  );
};

export default UserMapMarker;
