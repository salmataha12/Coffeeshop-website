import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './SortingButton.module.css';
import Button from '../Button/Button';
import SortingModal from '../sortingmodal/SortingModal';
import ButtonIcon from './FilterIcon';

export const SortingButton = ({sortOptions = [], onSortClickEvent = () => {}, onFilterClickEvent = () => {}, IsEnabled = false, priceRanges = []}) => {
  const [showOptions, setShowOptions] = useState(false);
  const popupRef = useRef(null);
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sliderValues, setSliderValues] = useState(priceRanges);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className={styles.sorting_button_container}>
      
      <Button className={styles.main_button} onClick={() => setShowOptions(true)} icon={<ButtonIcon/>} disabled={!IsEnabled}/>
      {showOptions && ( <SortingModal setShowModal={setShowOptions} sortOptions={sortOptions} onSortClick={(option) => onSortClickEvent(option)} onFilterClick={(filters) => onFilterClickEvent(filters)} priceRanges={priceRanges} selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption} selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} sliderValues={sliderValues} setSliderValues={setSliderValues}/> )}
    </div>
  );
};
