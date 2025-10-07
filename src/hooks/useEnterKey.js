import { useCallback } from 'react';

/**
 * Custom hook to handle Enter key press events
 * @param {Function} callback - Function to call when Enter key is pressed
 * @returns {Function} Event handler function for key press events
 */
export const useEnterKey = (callback) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      callback();
    }
  }, [callback]);

  return handleKeyPress;
};
