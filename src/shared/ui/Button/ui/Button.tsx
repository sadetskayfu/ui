import {
  ButtonHTMLAttributes,
  forwardRef,
  memo,
  ReactNode,
  useRef,
} from "react";
import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import styles from "./style.module.scss";
import { RippleWrapper } from "../../RippleWrapper";
import { Link } from "react-router-dom";

export type ButtonVariant = "filled" | "outlined" | "clear";
export type ButtonColor = "primary" | "secondary";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isKeyBlocked?: boolean;
  isStopFocus?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  to?: string;
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  Icon?: ReactNode;
  tabIndex?: number;
  onClick?: () => void;
}

export const Button = memo(
  forwardRef(
    (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement | null>) => {
      const {
        children,
        className,
        isDisabled,
        isReadonly,
        isKeyBlocked,
        isStopFocus,
        isLink,
        isExternalLink,
        to = "",
        variant = "filled",
        size = "medium",
        color = "primary",
        type = "button",
        Icon,
        tabIndex,
        onClick,
        ...otherProps
      } = props;

      const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

      const handleClick = (event: React.MouseEvent) => {
        onClick?.();
        handleRippleMousePosition(rippleWrapperRef, event);
      };

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          if (isKeyBlocked) {
            event.preventDefault();
          } else {
            event.preventDefault();
            onClick?.();
            handleRipple(rippleWrapperRef);
          }
        }
      };

      const handleMouseDown = (event: React.MouseEvent) => {
        if (isStopFocus) {
          event.preventDefault();
        }
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[color],
        styles[size],
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
            {Icon && <div className={styles["icon"]}>{Icon}</div>}
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
            {Icon && <div className={styles["icon"]}>{Icon}</div>}
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
          <span className={styles["label"]}>{children}</span>
          {Icon && <div className={styles["icon"]}>{Icon}</div>}
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      );
    }
  )
);
