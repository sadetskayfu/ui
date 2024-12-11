import { ReactElement } from "react";
import { classNames } from "@/shared/lib";
import { Portal } from "@/shared/ui/Portal";
import styles from "./style.module.scss";

export type BackdropVariant = "dark" | "clear";

interface BackdropProps {
  className?: string;
  variant?: BackdropVariant;
  children: ReactElement;
  isVisible: boolean;
  isUnmountingAnimation?: boolean;
  isMountingAnimation?: boolean
  onClose?: () => void;
  zIndex: number;
}

export const Backdrop = (props: BackdropProps) => {
  const {
    className,
    children,
    isVisible,
    isUnmountingAnimation,
    isMountingAnimation,
    onClose,
    variant = "dark",
    zIndex,
  } = props;

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible,
    [styles['unmounting']]: isUnmountingAnimation,
    [styles['mounting']]: isMountingAnimation
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
  ];

  return (
    <Portal>
      <div
        style={{zIndex: isVisible ? zIndex : -1000}}
        onClick={onClose}
        className={classNames(styles["backdrop"], additionalClasses, mods)}
      >
        {children}
      </div>
    </Portal>
  );
};
