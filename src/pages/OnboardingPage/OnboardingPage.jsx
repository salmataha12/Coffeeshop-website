import React from 'react';
import styles from './onboardingPage.module.css';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import TrackerMap from '@/components/trackermap/TrackerMap';

export default function Onboarding() {
  let navigate = useNavigate();
  const startButtonStyle = {
    width: '327px',
    height: '56px',
    padding: '20px 16px',
    borderRadius: '16px',
  };
  return (
    <div className={styles.page}>
    <div className={styles.content_container}>
      <div className={styles.text_container}>
        <h1>Fall in Love with Coffee in Blissful Delight!</h1>
        <p>
          {' '}
          Welcome to our cozy coffee shop, where every cup is a delightful for
          you.{' '}
        </p>
      </div>
      <Button
        text="Get Started"
        onClick={() => navigate('/home')}
        style={startButtonStyle}
      />
    </div>
  </div>
  );
}
