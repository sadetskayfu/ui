import { classNames, handleRipple, handleRippleMousePosition } from "@/shared/lib";
import styles from "./style.module.scss";
import { memo, useCallback, useRef } from "react";
import { Icon } from "@/shared/ui/Icon";
import { RippleWrapper } from "../../RippleWrapper";
import { IconButton } from "../../IconButton";

export type ChipVariant = "filled" | "outlined";
export type ChipColor = "primary" | "secondary" | "success" | "error";
export type ChipSize = "small" | "medium"

interface ChipProps {
  className?: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  label: string
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
    label,
    onClick,
    onClose,
    isStopFocus,
    isClickable,
    isDisabled,
    tabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

  const handleKeyDownClick = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      onClick?.();
      handleRipple(rippleWrapperRef)
    }
  };

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick?.();
    handleRippleMousePosition(rippleWrapperRef, event);
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
        <span>{label}</span>
        {onClose && (
          <IconButton size={size === 'small' ? 'small-s' : 'small-m'} color="secondary" variant="filled" onClick={handleClose} isDisabled={isDisabled} tabIndex={currentTabIndex}>
            <Icon
              color="custom-color"
              variant="x-mark"
              size="custom-size"
            />
          </IconButton>
        )}
        <RippleWrapper ref={rippleWrapperRef} />
      </button>
    );
  }

  return (
    <div
      className={classNames(styles["chip"], additionalClasses, mods)}
      onClick={handleStopPropagation}
    >
      <span>{label}</span>
      {onClose && (
        <IconButton size={size === 'small' ? 'small-s' : 'small-m'} color="secondary" variant="filled" onClick={handleClose} isDisabled={isDisabled} tabIndex={currentTabIndex}>
          <Icon
            color="custom-color"
            variant="x-mark"
            size="custom-size"
          />
        </IconButton>
      )}
    </div>
  );
});
