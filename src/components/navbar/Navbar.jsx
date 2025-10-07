import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosHeartEmpty, IoIosHeart  } from "react-icons/io";
import { BsHandbag, BsFillHandbagFill } from "react-icons/bs";
import { PiBellLight, PiBellSimpleFill  } from "react-icons/pi";
import styles from "./navbar.module.css";
import Tooltip from "../tooltip/Tooltip";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const routeIcons = [
        { icon: [<GoHome className={styles.gray_text}/>, <GoHomeFill className={styles.primary_text}/>], label: "Home", path: "/home" },
        { icon: [<IoIosHeartEmpty className={styles.gray_text}/>, <IoIosHeart className={styles.primary_text}/>], label: "Favorites", path: "/favourites" },
        { icon: [<BsHandbag className={styles.gray_text}/>, <BsFillHandbagFill className={styles.primary_text}/>], label: "Cart", path: "/order" },
        { icon: [<PiBellLight className={styles.gray_text}/>, <PiBellSimpleFill  className={styles.primary_text}/>], label: "Notifications", path: "/notifications" }
    ];

    return (
        <div className={styles.navbar_container}>
            <div className={styles.navbar_box}>
                {routeIcons.map((route, index) => (
                        <Link key={index} to={route.path} className={styles.relative_houser}>
                            <Tooltip text={route.label}>
                                    {currentPath === route.path ? route.icon[1] : route.icon[0]}
                            </Tooltip>
                            {currentPath == route.path && <div className={styles.nav_icon_underline}/>}
                        </Link>
                ))}
            </div>
        </div>
    );
}