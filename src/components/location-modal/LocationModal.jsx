import React, { useState } from 'react';
import { IoSave } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { saveLocation, setCurrentLocation } from '../../redux/userInfo';
import { useEnterKey } from '../../hooks/useEnterKey';
import Button from '../Button/Button';
import styles from './location-modal.module.css';

const LocationModal = ({
  isOpen,
  Close,
  currentLocation = 'Select location',
  currentCoords = { latitude: null, longitude: null },
}) => {
  const dispatch = useDispatch();
  const savedLocations = useSelector((state) => state.userInfo.savedLocations);
  const [locationName, setLocationName] = useState('');

  const handleSaveLocation = () => {
    const trimmedName = locationName.trim();
    if (trimmedName) {
      const newSavedLocation = {
        locationTag: trimmedName,
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
      };
      dispatch(saveLocation(newSavedLocation));
      dispatch(setCurrentLocation(newSavedLocation));
      setLocationName('');
      Close();
    }
  };

  const handleSelectSavedLocation = (savedLocation) => {
    dispatch(
      setCurrentLocation({
        locationTag: savedLocation.locationTag,
        latitude: savedLocation.latitude,
        longitude: savedLocation.longitude,
      })
    );
    Close();
  };

  const handleDropdownChange = (e) => {
    const selectedIndex = e.target?.value;
    if (selectedIndex !== '' && selectedIndex !== undefined) {
      const selectedLocation = savedLocations[parseInt(selectedIndex)];
      if (selectedLocation) {
        handleSelectSavedLocation(selectedLocation);
      }
    }
  };

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      Close();
    }
  };

  const handleKeyPress = useEnterKey(handleSaveLocation);

  if (!isOpen) return null;

  const hasValidLocationName = Boolean(locationName.trim());

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.dropdown}>
        <div className={styles.header}>
          <h3>Edit Location</h3>
          <button
            className={styles.closeButton}
            onClick={Close}
            aria-label="Close dropdown"
          >
            ×
          </button>
        </div>

        <div className={styles.currentLocation}>
          <div className={styles.currentLocationLabel}>
            Current Location: {currentLocation}
          </div>
        </div>

        {savedLocations.length > 0 && (
          <div className={styles.savedLocationsSection}>
            <h4>Choose Saved Location</h4>
            <select
              className={styles.savedLocationsDropdown}
              onChange={handleDropdownChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a saved location...
              </option>
              {savedLocations.map((location, index) => (
                <option key={index} value={index}>
                  {location.locationTag} ({location.latitude.toFixed(4)},{' '}
                  {location.longitude.toFixed(4)})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="locationName" className={styles.inputLabel}>
            Location Name
          </label>
          <input
            type="text"
            id="locationName"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter location name..."
            className={styles.inputField}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            text="Save Current Location"
            icon={<IoSave />}
            onClick={hasValidLocationName ? handleSaveLocation : undefined}
            className={styles.main_button}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
