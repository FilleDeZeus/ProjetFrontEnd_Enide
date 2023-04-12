import { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

export const Google = ({ car }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: car.latitude,
    lng: car.longitude,
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onMarkerLoad = (marker) => {
    setMarker(marker);
  };

  useEffect(() => {
    if (map && marker) {
      map.panTo(center);
      marker.setPosition(center);
    }
  }, [map, marker, center]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={onMapLoad}
    >
      <Marker position={center} onLoad={onMarkerLoad} />
    </GoogleMap>
  );
};
