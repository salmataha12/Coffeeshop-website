import { useState } from 'react';

export default function UseIncrementer() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return { count, increment };
}