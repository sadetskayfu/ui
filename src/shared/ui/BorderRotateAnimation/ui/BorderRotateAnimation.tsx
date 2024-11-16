import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { ReactNode } from "react";

interface BorderRotateAnimationProps {
  isActive?: boolean;
  children: ReactNode;
}

export const BorderRotateAnimation = (props: BorderRotateAnimationProps) => {
  const { isActive, children } = props;

  const mods: Record<string, boolean | undefined> = {
    [styles["active"]]: isActive,
  };

  return (
    <div className={classNames(styles["container"], [], mods)}>
      <span className={styles["top"]}></span>
      <span className={styles["right"]}></span>
      {children}
    </div>
  );
};
