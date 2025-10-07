import React, { useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import DriverInfo from "@/components/DriverInfo/DriverInfo";
import TrackerMap from "@/components/trackermap/TrackerMap";
import DeliveryTime from "@/components/DeliveryTime/DeliveryTime";
import drivers from "@/data/Data.json";
import styles from "./ordertack.module.css";

export default function OrderTrackPage() {
  const randomDriver = useMemo(() => {
    if (!drivers || drivers.length === 0) return null;
    const idx = Math.floor(Math.random() * drivers.length);
    return drivers[idx];
  }, []);

    const navigate = useNavigate();


  return (
    <div className={styles.orderTrackContainer}>
      <div className={styles.mapSection}>
               <button
          className={styles.backButton}
          onClick={() => navigate("/home")}
          aria-label="Go back"
        >
          &#8592;
        </button>
        <TrackerMap />
      </div>
      
      <div className={styles.deliveryTimeSection}>
        <DeliveryTime />
      </div>
      
      <div className={styles.driverInfoSection}>
        <DriverInfo driver={randomDriver} />
      </div>
    </div>
  );
}