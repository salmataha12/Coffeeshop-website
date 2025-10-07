import { useEffect, useState } from 'react';

/**
 * Custom hook for managing loading state with a configurable delay
 * @param {number} delay - Delay in milliseconds before setting loading to false
 * @returns {boolean} isLoading - Current loading state
 */
export const useLoadingState = (delay = 1500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};
