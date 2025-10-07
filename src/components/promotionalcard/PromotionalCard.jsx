import React, { useState, useEffect, useRef } from "react"
import { useGetPromosListQuery } from "@/redux/DrinksApi"
import { useDispatch } from 'react-redux';
import { applyPromo } from "@/redux/cart/cartSlice";
import styles from "./PromotionalCard.module.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function PromotionalCard() {
  const {data, error, isLoading} = useGetPromosListQuery();
  const [banners, setBanners] = useState([])
  const [imageLoading, setImageLoading] = useState({})
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if(isLoading) return;

    if(error) {
      console.error(error);
    }

    setBanners(data.filter((item) => item.active == true));
  }, [isLoading, data, error]);


  useEffect(() => {
    if(isLoading) return;

    if (banners.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev)=>(prev + 1) % banners.length);
      }, 30000)
      
      return () => clearInterval(intervalRef.current)
    }
  }, [banners])


  const resetCarousel = () => {
    clearInterval(intervalRef.current);
      if (banners.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev)=>(prev + 1) % banners.length);
      }, 30000)
    }
  }

  const handleImage = (bannerId, type) => setImageLoading((prev) => ({ ...prev, [bannerId]: type === "start" }))

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "160px",
          background: "#f3f4f6",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid #e5e7eb",
            borderTop: "3px solid #D97706",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    )

  if (error) return <div>error</div>

  return (
      <div className={styles.promo_banner + " " + styles.clickable}>
        <div className={styles.promo_flexor}>
        {banners.map((currentBanner, index) => { return (
          <div key={index} className={styles.promo_container} style={{ transform: `translateX(-${currentIndex * 100}%)` }} onClick={() => {
        if (!currentBanner) return;
        dispatch(applyPromo(currentBanner));
        toast.success("Promotion applied!")
      }}>
            <div className={styles.banner_bg}
              style={{
                backgroundImage: `url(${currentBanner?.image ?? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"})`,
              }}
            />

            <div className={styles.banner_content}>
              <div className={styles.text_section}>
                <div className={styles.promo_label}>Promo</div>
                <h2 className={styles.promo_title}>{currentBanner?.name}</h2>
                <p className={styles.promo_subtitle}>{currentBanner?.description}</p>
              </div>

              <div className={styles.coffee_image}>
                {imageLoading[currentBanner?.id] && <div className={styles.image_skeleton}></div>}
                <img
                  src={currentBanner?.image}
                  alt={currentBanner?.alt}
                  onLoad={() => handleImage(currentBanner?.id, "load")}
                  onLoadStart={() => handleImage(currentBanner?.id, "start")}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
                    handleImage(currentBanner?.id, "load")
                  }}
                  style={{ display: imageLoading[currentBanner?.id] ? "none" : "block" }}
                />
              </div>
            </div>
          </div>
          )})}
        </div>
        <div className={styles.pagination_container}>
          <FaChevronLeft onClick={() => {resetCarousel(); setCurrentIndex((prev) => (prev + banners.length - 1) % banners.length)}}/>
          <span>{currentIndex + 1} / {banners.length}</span>
          <FaChevronRight onClick={() => {resetCarousel(); setCurrentIndex((prev) => (prev + 1) % banners.length)}}/>
        </div>
        </div>
  )
}
