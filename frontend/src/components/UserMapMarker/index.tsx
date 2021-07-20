import { IconButton } from '@material-ui/core';
import React from 'react';
import { UserProps } from '../../utils/types';

// Constants that can change the marker
const triangleWidth = 25;
const triangleHeight = triangleWidth * 1.7;
const circleRadius = triangleWidth;

const markerColor = '#555';
const imagePadding = 8;

type UserMapMarkerProps = {
  lat: number;
  lng: number;
  key: number;
  user: UserProps;
  onClick: () => void;
};
const UserMapMarker = ({ user, onClick }: UserMapMarkerProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent) => {
    onClick();
    event.stopPropagation();
  };
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
    </>
  );
};

export default UserMapMarker;
