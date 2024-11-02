import { useCallback, useRef, useState } from "react";

export const useAnimation = (duration: number = 500) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsAnimating(false);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    }, 0);
  }, [duration]);
  
  return { isAnimating, startAnimation };
};
