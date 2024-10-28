import { useRef, useState } from "react";

export const useAnimation = () => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsAnimating(false);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 0);
  };
  
  return { isAnimating, startAnimation };
};
