import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocationTag } from '../../redux/userInfo';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import styles from './editAddressModal.module.css';

export default function EditAddressModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const currentLocation = useSelector(
    (state) => state.userInfo.currentLocation
  );

  const [newTag, setNewTag] = useState(currentLocation.locationTag);
  const [error, setError] = useState('');

  const handleUpdate = () => {
    const trimmedTag = newTag.trim();

    if (trimmedTag === '') {
      setError('Location name cannot be empty');
      return;
    }

    if (trimmedTag === currentLocation.locationTag) {
      onClose();
      return;
    }

    dispatch(
      updateLocationTag({
        oldTag: currentLocation.locationTag,
        newTag: newTag.trim(),
      })
    );
    onClose();
  };

  const handleInputChange = (e) => {
    setNewTag(e.target.value);
    if (error) setError('');
  };

  const updateButtonStyle = {
    width: '327px',
    height: '56px',
    padding: '20px 16px',
    borderRadius: '16px',
  };

  const closeButtonStyle = {
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    color: '#374151',
    cursor: 'pointer',
    padding: '4px',
    transition: 'all 0.2s ease',
    alignSelf: 'flex-end',
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dropdown}>
        <div className={styles.header}>
          <h3>Edit Address</h3>
          <Button
            icon={<IoCloseOutline />}
            onClick={onClose}
            style={closeButtonStyle}
          />
        </div>
        <div className={styles.input}>
          <InputText
            label="Location Name"
            value={newTag}
            placeholder="Enter new location name"
            onChange={handleInputChange}
            error={error}
          ></InputText>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <Button
          text="Update Location Name"
          style={updateButtonStyle}
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
}
