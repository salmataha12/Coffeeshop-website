import React, { useState, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from '../../redux/userInfo';
import { getLocationName } from '../../services/locationService';
import { getCurrentPosition } from '../../services/geolocationService';
import styles from './location-text-box.module.css';
import LocationModal from '../location-modal/LocationModal';

const LocationTextBox = () => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    (state) => state.userInfo.currentLocation
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { latitude, longitude } = await getCurrentPosition();
      try {
        const locationName = await getLocationName(latitude, longitude);

        dispatch(
          setCurrentLocation({
            locationTag: locationName,
            latitude,
            longitude,
          })
        );

        setError(null);
      } catch (error) {
        setError(error.message);
      }
    } catch (geolocationError) {
      setError(geolocationError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const displayLocation =
    currentLocation.locationTag !== 'Select location'
      ? currentLocation.locationTag
      : 'Select location';

  return (
    <>
      <div className={styles.container}>
        <span className={styles.label}>Location</span>

        <button
          type="button"
          className={styles.box}
          onClick={() => !error && setIsDropdownOpen(true)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          disabled={error}
        >
          <div className={styles.locationContent}>
            {isLoading && (
              <span className={styles.loadingText}>Detecting location...</span>
            )}
            {error && <span className={styles.errorText}>{error}</span>}
            {!isLoading && !error && (
              <span className={styles.text} title={displayLocation}>
                {displayLocation}
              </span>
            )}
          </div>
          {!error && (
            <IoChevronDown
              className={`${styles.arrow} ${isDropdownOpen ? styles.arrowRotated : ''}`}
              aria-hidden
            />
          )}
        </button>
      </div>

      <LocationModal
        isOpen={isDropdownOpen}
        Close={() => setIsDropdownOpen(false)}
        currentLocation={displayLocation}
        currentCoords={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }}
      />
    </>
  );
};

export default LocationTextBox;
