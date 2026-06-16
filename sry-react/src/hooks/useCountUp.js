import { useEffect, useState } from 'react';

export default function useCountUp(start, end, duration) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const range = end - start;
    const increment = range / (duration * 1000 / 16); // 60fps
    let current = start;

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(Math.floor(end));
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return count;
}
