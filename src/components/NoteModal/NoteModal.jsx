import React, { useEffect, useState } from 'react';
import styles from './NoteModal.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { orderNote } from '@/redux/userInfo';

export default function NoteModal({ isOpen, onClose }) {
  const currentNotes = useSelector((state) => state.userInfo.orderNote);
  const dispatch = useDispatch();
  const [note, setNote] = useState(currentNotes || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) setNote(currentNotes || '');
  }, [isOpen, currentNotes]);

  const saveButtonStyle = {
    padding: '16px',
    borderRadius: '16px',
    width: '100%',
  };

  const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    color: '#374151',
    cursor: 'pointer',
    padding: '4px',
    alignSelf: 'flex-end',
  };

  const handleSaveNote = () => {
    try {
      dispatch(orderNote(note));
      setError('');
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Button icon={<IoCloseOutline />} onClick={onClose} style={closeButtonStyle} />
        <h3 className={styles.title}>Add note:</h3>

        <div className={styles.content}>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setError('');
            }}
            placeholder="e.g. Please don't ring the bell"
            className={styles.textBox}
            rows={4}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.footer}>
          <Button text="Save" style={saveButtonStyle} onClick={handleSaveNote} />
        </div>
      </div>
    </div>
  );
}
