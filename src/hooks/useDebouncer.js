import { useState } from 'react';

/**
 * @param {any} defaultValue
 * @param {number} delay
 * @returns {[any, React.Dispatch<any>]}
 */
export default function useDebouncer(defaultValue, delay = 500) {
  const [value, setValue] = useState(defaultValue ?? '');
  let timer;

  const setDebounced = (newValue) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setValue(newValue);
    }, delay);
  };

  return [value, setDebounced];
}
