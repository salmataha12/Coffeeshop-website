import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import deliveryMarker from '../../assets/location_marker.svg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useMapRecenter } from '../../hooks/useMapRecenter';
import { useLoadingState } from '../../hooks/useLoadingState';
import styles from './TrackerMap.module.css';

// Constants
const DEFAULT_ZOOM = 16;
const LOADING_DELAY = 1500;

// Configure default marker icon
const deliveryIcon = L.icon({
  iconUrl: deliveryMarker,
});
L.Marker.prototype.options.icon = deliveryIcon;

// Component to recenter map when position changes
const RecenterMap = ({ position }) => {
  useMapRecenter(position);
  return null;
};

const TrackerMap = ({ 
  zoom = DEFAULT_ZOOM,
  showControls = false,
  loadingMessage = "Loading location..."
}) => {
  const { currentLocation } = useSelector((state) => state.userInfo);
  const isLoading = useLoadingState(LOADING_DELAY);

  // Check if location is available
  const hasLocation = currentLocation.latitude && currentLocation.longitude;
  const position = hasLocation 
    ? [currentLocation.latitude, currentLocation.longitude]
    : null;

  if (isLoading) {
    return <LoadingSpinner message={loadingMessage} />;
  }

  if (!hasLocation) {
    return (
      <div className={styles.map_container}>
        <div className={styles.no_location_message}>
          <p>No Location Provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.map_container}>
      <MapContainer 
        center={position} 
        zoom={zoom} 
        className={styles.map_container}
        zoomControl={showControls}
        attributionControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} />
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default TrackerMap;