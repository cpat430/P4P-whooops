import React from 'react';
import { ImageIconButton, TriangleDiv } from '../MapMarker.styled';
import { LocationImage } from './LocationMarker.styled';

type LocationMapMarkerProps = {
  lat: number;
  lng: number;
  key: number;
  locationLetter: string;
  onClick: () => void;
};

const LocationMapMarker = (props: LocationMapMarkerProps): JSX.Element => {
  const { locationLetter, onClick } = props;

  const handleClick = (event: React.MouseEvent) => {
    onClick();
    event.stopPropagation();
  };

  return (
    <>
      {/* triangle that points towards the location */}
      <TriangleDiv isLocation={true} />

      {/* button that contains the location letter */}
      <ImageIconButton onClick={handleClick} isLocation={true}>
        {/* location letter */}
        <LocationImage>{locationLetter}</LocationImage>
      </ImageIconButton>
    </>
  );
};

export default LocationMapMarker;
