import React, { ReactNode } from 'react';

type MapMarkerProps = {
  lat: number;
  lng: number;
  children: ReactNode;
};
const MapMarker = ({ children }: MapMarkerProps): JSX.Element => {
  return (
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
      {children}
    </div>
  );
};

export default MapMarker;
