import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentLocation } from '@/redux/userInfo';
import styles from './deliveryAddress.module.css';

//Icons
import { FaRegEdit } from 'react-icons/fa';
import { FaRegStickyNote } from 'react-icons/fa';

// Components
import Button from '@/components/Button/Button';
import { constants } from '@/constants';

export default function DeliveryAddress({ onOpenNote, onOpenEdit }) {
  const dispatch = useDispatch();
  const savedLocations = useSelector((state) => state.userInfo.savedLocations);
  const currentLocation = useSelector(
    (state) => state.userInfo.currentLocation
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isCurrentLocationSelected =
    currentLocation.locationTag !== constants.SELECT_LOCATION_TAG;

  const editButtonStyle = {
    padding: '6px 12px',
    borderRadius: '16px',
    gap: '4px',
    backgroundColor: 'white',
    border: '1px solid #A2A2A2',
    color: 'black',
    fontWeight: '400',
    fontSize: '12px',
    width: 'fit-content',
  };

  const handleSelectLocation = (location) => {
    dispatch(setCurrentLocation(location));
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.address_container}>
      <h1 className={styles.address_title}>Delivery Address</h1>
      <div className={styles.current_address}>
        {!isCurrentLocationSelected
          ? 'Please select a delivery location from home page'
          : currentLocation.locationTag}
      </div>
      {isCurrentLocationSelected && (
        <div className={styles.coordinates}>
          ({currentLocation.latitude}, {currentLocation.longitude})
        </div>
      )}
      <div className={styles.buttons}>
        <Button
          icon={<FaRegEdit />}
          style={editButtonStyle}
          onClick={onOpenEdit}
        />
        <div className={styles.dropdownWrapper}>
          <Button
            text="Edit Address"
            style={editButtonStyle}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {savedLocations.length === 0 ? (
                <div className={styles.dropdownItem}>No saved locations</div>
              ) : (
                savedLocations.map((loc, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectLocation(loc)}
                  >
                    {loc.locationTag}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Button
          icon={<FaRegStickyNote />}
          text="Add Note"
          style={editButtonStyle}
          onClick={onOpenNote}
        ></Button>
      </div>
    </div>
  );
}
