import React from 'react';
import styles from './editAddress.module.css';
import InputText from '@/components/InputText/InputText';
import Button from '@/components/Button/Button';

import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export default function EditAddress() {
  let navigate = useNavigate();
  const saveButtonStyle = {
    padding: '20px 16px',
    borderRadius: '16px',
    marginBottom: '10px',
    marginTop: '24px',
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <FaChevronLeft onClick={() => navigate(-1)} />
        </div>
        <h3 className={styles.title}>Edit Address</h3>
      </div>
      <div className={styles.form}>
        <InputText label="Address" placeholder="Nasr City" required={true} />
        <InputText label="Apartment Number" placeholder="620" required={true} />
        <InputText label="City" placeholder="Cairo, Egypt" />
        <div className={styles.form_row}>
          <InputText label="Full Name" placeholder="Mohamed" required={true} />
          <InputText
            label="Address title"
            placeholder="Home "
            required={true}
          />
        </div>
        <Button text="Save" style={saveButtonStyle} />
      </div>
    </div>
  );
}
