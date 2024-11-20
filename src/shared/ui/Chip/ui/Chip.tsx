import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { memo } from "react";
import { Icon } from "@/shared/ui/Icon";

export type ChipVariant = "filled" | "outlined";
export type ChipColor = "primary" | "secondary" | "success" | "error";
export type ChipSize = "small" | "medium" | "large";

interface ChipProps {
  className?: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  children: string;
  onClose?: () => void;
  onClick?: () => void;
  isStopFocus?: boolean;
  tabIndex?: number;
  isDisabled?: boolean;
  isClickable?: boolean;
}

export const Chip = memo((props: ChipProps) => {
  const {
    className,
    variant = "filled",
    color = "primary",
    size = "medium",
    children,
    onClick,
    onClose,
    isStopFocus,
    isClickable,
    isDisabled,
    tabIndex = 0,
  } = props;

  const handleKeyDownClose = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      onClose?.();
    }
  };

  const handleKeyDownClick = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      onClick?.();
      startAnimation();
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose?.();
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick?.();
    startAnimation();
  };

  const handleStopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleStopFocus = (event: React.MouseEvent) => {
    isStopFocus && event.preventDefault();
  };

  const mods: Record<string, boolean | undefined> = {
    [styles["have-close-button"]]: !!onClose,
    [styles["clickable"]]: isClickable,
    [styles["disabled"]]: isDisabled,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[color],
    styles[size],
  ];

  const currentTabIndex = isDisabled ? -1 : tabIndex;

  if (isClickable) {
    return (
      <button
        className={classNames(styles["chip"], additionalClasses, mods)}
        onClick={handleClick}
        onKeyDown={handleKeyDownClick}
        onMouseDown={handleStopFocus}
        tabIndex={currentTabIndex}
        disabled={isDisabled}
      >
        <span>{children}</span>
        {onClose && (
          <button
            className={styles["button"]}
            onMouseDown={handleStopFocus}
            onClick={handleClose}
            onKeyDown={handleKeyDownClose}
            tabIndex={currentTabIndex}
            disabled={isDisabled}
          >
            <span className="visually-hidden">Delete</span>
            <Icon className={styles['icon']} color='custom-color' variant="x-mark" size="custom-size"/>
          </button>
        )}
      </button>
    );
  }

  return (
    <div
      className={classNames(styles["chip"], additionalClasses, mods)}
      onClick={handleStopPropagation}
    >
      <span>{children}</span>
      {onClose && (
        <button
          className={styles["button"]}
          onMouseDown={handleStopFocus}
          onClick={handleClose}
          onKeyDown={handleKeyDownClose}
          tabIndex={currentTabIndex}
          disabled={isDisabled}
        >
          <span className="visually-hidden">Delete</span>
          <Icon className={styles['icon']} color='custom-color' variant="x-mark" size="custom-size"/>
        </button>
      )}
    </div>
  );
});
