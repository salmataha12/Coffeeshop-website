import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_spinner}></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
