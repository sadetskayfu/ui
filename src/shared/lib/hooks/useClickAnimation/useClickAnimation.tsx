import { useState } from "react";

export const useClickAnimation = () => {
  const [isAnimation, setAnimation] = useState<boolean>(false);

  const handleToggleAnimation = () => {
    if (!isAnimation) {
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 500);
    }
  };
  return { isAnimation, handleToggleAnimation };
};
