import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
  useRef,
} from "react";
import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import { RippleWrapper } from "../../RippleWrapper";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export type IconButtonVariant = "filled" | "outlined" | "clear";
export type IconButtonColor = "primary" | "secondary"
export type IconButtonSize =
  | "small-s"
  | "small-m"
  | "small-l"
  | "medium"
  | "large"
  | "custom-size"

export type IconButtonBorderRadius = 'left' | 'right' | 'everywhere' | 'round' | 'none'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  borderRadius?: IconButtonBorderRadius
  isDisabled?: boolean;
  isReadonly?: boolean;
  isStopFocus?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  to?: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  tabIndex?: number;
  onClick?: () => void;
}

export const IconButton = 
  forwardRef(
    (
      props: IconButtonProps,
      ref: React.ForwardedRef<HTMLButtonElement | null>
    ) => {
      const {
        children,
        className,
        isDisabled,
        isReadonly,
        isStopFocus,
        isLink,
        isExternalLink,
        to = "",
        variant = "filled",
        size = "medium",
        color = "primary",
        borderRadius = 'round',
        type = "button",
        tabIndex,
        onClick,
        ...otherProps
      } = props;

      const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation()
          onClick?.();
          handleRipple(rippleWrapperRef);
        }
      };

      const handleMouseDown = (event: React.MouseEvent) => {
        if (isStopFocus) {
          event.preventDefault();
        }
      };

      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        onClick?.();
        handleRippleMousePosition(rippleWrapperRef, event);
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[color],
        styles[size],
        styles[borderRadius]
      ];

      const mods: Record<string, boolean | undefined> = {
        [styles["disabled"]]: isDisabled,
        [styles["readonly"]]: isReadonly,
      };

      if (isLink) {
        return (
          <Link
            className={classNames(styles["button"], additionalClasses, mods)}
            onKeyDown={handleKeyDown}
            to={to}
            onClick={handleClick}
            tabIndex={tabIndex}
          >
            <span className={styles["label"]}>{children}</span>
            <div className={styles["icon"]}>{children}</div>
            <RippleWrapper ref={rippleWrapperRef} />
          </Link>
        );
      }

      if (isExternalLink) {
        return (
          <a
            className={classNames(styles["button"], additionalClasses, mods)}
            onKeyDown={handleKeyDown}
            href={to}
            onClick={handleClick}
            tabIndex={tabIndex}
          >
            <span className={styles["label"]}>{children}</span>
            <div className={styles["icon"]}>{children}</div>
            <RippleWrapper ref={rippleWrapperRef} />
          </a>
        );
      }

      return (
        <button
          className={classNames(styles["button"], additionalClasses, mods)}
          type={type}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          tabIndex={isDisabled || isReadonly ? -1 : tabIndex}
          disabled={isDisabled}
          aria-readonly={isReadonly ? "true" : "false"}
          ref={ref}
          {...otherProps}
        >
          <div className={styles["icon"]}>{children}</div>
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      );
    }
  );
