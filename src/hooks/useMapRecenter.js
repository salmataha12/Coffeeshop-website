import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * Custom hook to recenter the map when position changes
 * @param {Array} position - [latitude, longitude] coordinates
 */
export const useMapRecenter = (position) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);
};
