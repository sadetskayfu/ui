import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import styles from "./style.module.scss";
import { memo, useRef } from "react";
import { Icon } from "@/shared/ui/Icon";
import { RippleWrapper } from "../../RippleWrapper";
import { IconButton } from "../../IconButton";

export type ChipVariant = "filled" | "outlined";
export type ChipColor = "primary" | "secondary" | "success" | "error";
export type ChipSize = "small" | "medium";

interface ChipProps {
  className?: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  label: string;
  onClose?: () => void;
  onClick?: () => void;
  stopFocus?: boolean;
  tabIndex?: number;
  closeButtonTabIndex?: number;
  disabled?: boolean;
  readonly?: boolean;
  clickable?: boolean;
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
    stopFocus,
    clickable,
    disabled,
    readonly,
    tabIndex = 0,
    closeButtonTabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      event.preventDefault()
      if(readonly) return
      onClick?.();
      handleRipple(rippleWrapperRef);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    //event.stopPropagation();
    if(readonly) return
    onClick?.();
    handleRippleMousePosition(rippleWrapperRef, event);
  };

  const handleStopFocus = (event: React.MouseEvent) => {
    stopFocus && event.preventDefault();
  };

  const mods: Record<string, boolean | undefined> = {
    [styles["have-close-button"]]: !!onClose,
    [styles["clickable"]]: clickable,
    [styles["disabled"]]: disabled,
    [styles['readonly']]: readonly,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[color],
    styles[size],
  ];

  const localTabIndex = disabled ? -1 : tabIndex;
  const localCloseButtonTabIndex = disabled ? -1 : closeButtonTabIndex;

  if (clickable) {
    return (
      <button
        className={classNames(styles["chip"], additionalClasses, mods)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={handleStopFocus}
        tabIndex={localTabIndex}
        disabled={disabled}
        aria-readonly={readonly ? 'true' : undefined}
      >
        <span>{label}</span>
        {onClose && (
          <IconButton
            className={styles['close-button']}
            size='custom-size'
            color="secondary"
            variant="filled"
            onClick={onClose}
            disabled={disabled}
            readonly={readonly}
            tabIndex={localCloseButtonTabIndex}
            stopFocus
          >
            <Icon color="custom-color" variant="x-mark" size="custom-size" />
          </IconButton>
        )}
        <RippleWrapper ref={rippleWrapperRef} />
      </button>
    );
  }

  return (
    <div
      className={classNames(styles["chip"], additionalClasses, mods)}
      //onClick={handleStopPropagation}
      onMouseDown={handleStopFocus}
    >
      <span>{label}</span>
      {onClose && (
        <IconButton
          className={styles['close-button']}
          size='custom-size'
          color="secondary"
          variant="filled"
          onClick={onClose}
          disabled={disabled}
          readonly={readonly}
          tabIndex={localCloseButtonTabIndex}
          stopFocus
        >
          <Icon color="custom-color" variant="x-mark" size="custom-size" />
        </IconButton>
      )}
    </div>
  );
});
