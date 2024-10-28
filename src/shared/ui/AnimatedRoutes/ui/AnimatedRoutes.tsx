import { useAnimation } from "@/shared/lib/hooks";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

interface AnimatedRoutesProps {
  children: ReactNode;
}

export const AnimatedRoutes = ({ children }: AnimatedRoutesProps) => {
  const location = useLocation();
  const { isAnimating, startAnimation } = useAnimation();

  useEffect(() => {
    startAnimation();
  }, [location.pathname]);

  const mods: Record<string, boolean> = {
    [styles["animated"]]: isAnimating,
  };

  return (
    <div className={classNames(styles["wrapper"], [], mods)}>
      <div className={styles["content"]}>{children}</div>
    </div>
  );
};
