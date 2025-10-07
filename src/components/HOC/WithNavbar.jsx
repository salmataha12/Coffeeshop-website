import React from "react";
import Navbar from "../navbar/Navbar.jsx";
import styles from "./WithNavbar.module.css";

export default function WithNavbar(Component) {
    return function WrappedComponent(props) {
        return (
            <div className={styles.with_navbar_container}>
                <Component {...props} />
                <Navbar />
            </div>
        );
    }
}