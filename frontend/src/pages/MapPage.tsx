import { IconButton } from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GoogleMapReact from 'google-map-react';

/**
 * Any React Component that is rendered on the map must
 * accept {lat, lng} in its props, which indicates where
 * it will be rendered on the map
 *
 * Also, the coordinate is the top-left position, not the center
 */
type Coordinate = {
  lat: number;
  lng: number;
};

const PersonMarker = ({ lat, lng }: Coordinate) => {
  return (
    <IconButton
      onClick={() => {
        alert(`Location: ${lat}, ${lng}`);
      }}
    >
      <EmojiPeopleIcon />
    </IconButton>
  );
};

const MapPage = () => {
  const mapKey = process.env.REACT_APP_MAP_KEY;
  if (mapKey === undefined) {
    console.error('Map key is undefined');
  }

  const defaultProps = {
    // OGGB
    center: {
      lat: -36.8531,
      lng: 174.7715,
    },
    zoom: 14,
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapKey || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* Sky Tower */}
        <PersonMarker lat={-36.8484} lng={174.7622} />
        {/* Flat */}
        <PersonMarker lat={-36.848869} lng={174.781547} />
      </GoogleMapReact>
    </div>
  );
};

export default MapPage;
