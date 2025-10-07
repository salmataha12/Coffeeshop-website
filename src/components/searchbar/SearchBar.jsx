import React from 'react';
import styles from './searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';
import Dropdown from '../dropdown/DropDown';
import debounce from '@/utils/debounce';

export default function SearchBar({ drinksList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);
  const handleInput = useCallback(debounce(onInputChange), []);

  const fuse = useMemo(
    () =>
      new Fuse(drinksList, {
        keys: [
          { name: 'name', weight: 2 },
          { name: 'description', weight: 1 },
          { name: 'category', weight: 1 },
        ],
        ignoreFieldNorm: true,
        minMatchCharLength: 3,
        threshold: 0.3,
      }),
    [drinksList]
  );

  function onInputChange(e) {
    const value = e.target?.value?.trim() ?? '';
    if (!value) {
      setSearchResults([]);
      setShowDropDown(false);
      return;
    }
    const results = fuse.search(value);
    setSearchResults(results);
    setShowDropDown(true);
  }

  return (
    <div
      className={styles.searchbar}
      tabIndex={0}
      onBlur={() => setShowDropDown(false)}
    >
      <div
        className={`${styles.searchbar_container} ${showDropdown ? styles.has_dropdown : ''}`}
      >
        <CiSearch color="white" />
        <input
          type="text"
          className={styles.searchbar_input}
          placeholder="Search coffee"
          onFocus={(e) => setShowDropDown(!!e.target.value)}
          onBlur={(e) => e.stopPropagation()}
          onInput={handleInput}
        />
      </div>
      {showDropdown && (
        <div className={styles.searchbar_dropdown_container}>
          <Dropdown items={searchResults} />
        </div>
      )}
    </div>
  );
}
