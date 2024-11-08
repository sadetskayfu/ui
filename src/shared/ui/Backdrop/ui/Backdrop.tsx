import { ReactElement } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { Portal } from "../../Portal";

export type BackdropVariant = "dark" | "clear";
type BackdropZIndex = "small" | "large";

interface BackdropProps {
  className?: string;
  variant?: BackdropVariant;
  zIndex?: BackdropZIndex;
  children: ReactElement;
  isVisible: boolean;
  onClose?: () => void;
}

export const Backdrop = (props: BackdropProps) => {
  const {
    className,
    children,
    isVisible,
    onClose,
    variant = "dark",
    zIndex = "large",
  } = props;

  const mods: Record<string, boolean> = {
    [styles["visible"]]: isVisible,
  };
  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[zIndex],
  ];

  return (
    <Portal>
      <div
        onClick={() => onClose?.()}
        className={classNames(styles["backdrop"], additionalClasses, mods)}
      >
        {children}
      </div>
    </Portal>
  );
};
