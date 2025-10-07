import React from "react";
import styles from "./DriverInfo.module.css";
import useDial from "@/hooks/useDial";
import { FaPhone } from "react-icons/fa";
import style from "@/components/Button/Button.module.css";


export default function DriverInfoBar({ driver }) {
  const { copied, Copy, telephone } = useDial(driver.phone);

  return (
    <div className={styles.driver_card}>
     
      <div className={styles.driver_avatar}>
        {driver.photoUrl ? (
          <img src={driver.photoUrl} alt={driver.name} />
        ) : (
          <span>{driver.name[0]}</span>
        )}
      </div>

      
      <div className={styles.driver_info}>
        <h3 >{driver.name}</h3>
        {driver.description && <p>{driver.description}</p>}
      </div>

      
      <button
        className={styles.call_btn}
        onClick={() =>
          document.getElementById("call-popup").showModal()
        }
      >
         <FaPhone className={styles.call_logo} />
      </button>

      
      <dialog id="call-popup" className={styles.call_dialog}>
        <button
          className={styles.close}
          onClick={() => document.getElementById("call-popup").close()}
        >
          &times;
        </button>
        <h4 >Call {driver.name}</h4>
        <div  className={styles.phone_box}>
          <span>{driver.phone}</span>
          <button onClick={Copy}>
            {copied ? "✔ Copied" : "📋"}
          </button>
        </div>
        <a href={telephone()} className={styles.call_now}>
           <FaPhone className={styles.call_logo} />
        </a>
        <form method="dialog" className={styles.form}>
        </form>
      </dialog>
    </div>
  );
}
