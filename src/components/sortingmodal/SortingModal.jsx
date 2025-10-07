import React from 'react';
import styles from "./SortingModal.module.css";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Slider, InputNumber } from "antd";

export default function SortingModal({ setShowModal, sortOptions = [], onSortClick = () => {}, onFilterClick = () => {}, priceRanges = [], selectedSortOption, setSelectedSortOption, selectedRatings, setSelectedRatings, sliderValues, setSliderValues }) {
    const [sortAccordion, setSortAccordion] = useState(false);
    const [filterAccordion, setFilterAccordion] = useState(false);
    const ratingOptions = [1, 2, 3, "4+"];
    
    const handleRatingClick = (rating) => {
        if (selectedRatings.includes(rating)) {
            const newRatings = selectedRatings.filter(r => r !== rating);
            setSelectedRatings(newRatings);
            onFilterClick({ ratings: newRatings });
        } else {
            const newRatings = [...selectedRatings, rating];
            setSelectedRatings(newRatings);
            onFilterClick({ ratings: newRatings, priceRanges: sliderValues });
        }
    };

    const handleMinPriceChange = (min) => {
        const newValues = [min, sliderValues[1]];
        setSliderValues(newValues);
        onFilterClick({ ratings: selectedRatings, priceRanges: newValues });
    };

    const handleMaxPriceChange = (max) => {
        const newValues = [sliderValues[0], max];
        setSliderValues(newValues);
        onFilterClick({ ratings: selectedRatings, priceRanges: newValues });
    };

    const handleSliderChange = (values) => {
        setSliderValues(values);
        onFilterClick({ ratings: selectedRatings, priceRanges: values });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.dropdown}>
                <div className={styles.header}>
                    <h3>Filter Option</h3>
                    <button className={styles.closeButton} onClick={() => setShowModal(false)} aria-label="Close dropdown">×</button>
                </div>
                <div>
                    <div className={styles.accordion_section}>
                        <div className={styles.accordion_header} onClick={() => setSortAccordion(!sortAccordion)}>
                            <span className={styles.text}>Sort by</span>
                            <div className={`${styles.accordion_icon} ${sortAccordion ? styles.rotate : ""}`}>
                            <FaChevronDown/>
                            </div>
                        </div>
                        <div className={`${styles.accordion_content} ${sortAccordion ? styles.expand : ""}`}>
                            {sortOptions.map((option, index) => (
                                <button key={index} className={styles.accordion_item + " " + (selectedSortOption?.label == option.label ? styles.bolded_text : "")} onClick={() =>{setSelectedSortOption(option); onSortClick(option);}}>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.accordion_section}>
                        <div className={styles.accordion_header} onClick={() => setFilterAccordion(!filterAccordion)}>
                            <span className={styles.text}>Filter by</span>
                            <div className={`${styles.accordion_icon} ${filterAccordion ? styles.rotate : ""}`}>
                            <FaChevronDown/>
                            </div>
                        </div>
                        <div className={`${styles.accordion_content} ${filterAccordion ? styles.expand : ""}`}>
                            <div className={styles.slider_section}>
                                <div className={styles.slider_label}>Price Range</div>
                                    <div className={styles.price_range}>
                                        <div className={styles.price_inputs}>
                                            <InputNumber
                                                min={priceRanges[0]}
                                                max={priceRanges[1]}
                                                value={sliderValues[0]}
                                                onChange={handleMinPriceChange}
                                                placeholder="Min"
                                                className={styles.price_input}
                                            />
                                            <span>-</span>
                                            <InputNumber
                                                min={priceRanges[0]}
                                                max={priceRanges[1]}
                                                value={sliderValues[1]}
                                                onChange={handleMaxPriceChange}
                                                placeholder="Max"
                                                className={styles.price_input}
                                            />
                                        </div>
                                        <div className={styles.slider_container}>
                                        <Slider 
                                            min={priceRanges[0]} 
                                            max={priceRanges[1]} 
                                            step={Math.min(0.01, (priceRanges[1] - priceRanges[0])/100)} 
                                            value={sliderValues}
                                            range={true}
                                            tooltip={{open: false}}
                                            onChange={handleSliderChange}
                                        />
                                        </div>
                                    </div>
                            </div>
                            
                            {/* Rating Filter Section */}
                            <div className={styles.rating_section}>
                                <div className={styles.rating_label}>Rating Filter</div>
                                <div className={styles.rating_buttons}>
                                    {ratingOptions.map((rating) => (
                                        <button
                                            key={rating}
                                            className={`${styles.rating_button} ${selectedRatings.includes(rating) ? styles.rating_button_selected : ''}`}
                                            onClick={() => handleRatingClick(rating)}
                                        >
                                            {rating}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}