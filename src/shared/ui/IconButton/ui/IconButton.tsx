import {
  ButtonHTMLAttributes,
  forwardRef,
  LinkHTMLAttributes,
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

type LinkProps = Omit<LinkHTMLAttributes<HTMLAnchorElement>, "href" | "tabIndex">
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "tabIndex" | "disabled">

export interface IconButtonProps {
  className?: string;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  borderRadius?: IconButtonBorderRadius
  disabled?: boolean;
  readonly?: boolean;
  stopFocus?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  to?: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  tabIndex?: number;
  onClick?: () => void;
  linkProps?: LinkProps;
  buttonProps?: ButtonProps;
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
        disabled,
        readonly,
        stopFocus,
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
        linkProps,
        buttonProps,
      } = props;

      const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);
      const linkRef = useRef<HTMLAnchorElement | null>(null)

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation()
          
          if(readonly) return

          if(isLink || isExternalLink) {
            linkRef.current?.click()
          } else {
            onClick?.();
          }
          
          handleRipple(rippleWrapperRef);
        }
      };

      const handleMouseDown = (event: React.MouseEvent) => {
        if (stopFocus) {
          event.preventDefault();
        }
      };

      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()

        if(readonly) return

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
        [styles["disabled"]]: disabled,
        [styles["readonly"]]: readonly,
      };

      const localTabIndex = disabled ? -1 : tabIndex

      if (isLink) {
        return (
          <Link
            className={classNames(styles["button"], additionalClasses, mods)}
            to={to}
            tabIndex={localTabIndex}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={linkRef}
            {...linkProps}
          >
            {children}
            <RippleWrapper ref={rippleWrapperRef} />
          </Link>
        );
      }

      if (isExternalLink) {
        return (
          <a
            className={classNames(styles["button"], additionalClasses, mods)}
            href={to}
            tabIndex={localTabIndex}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={linkRef}
            {...linkProps}
          >
            {children}
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
          tabIndex={localTabIndex}
          disabled={disabled}
          aria-readonly={readonly ? 'true' : undefined}
          ref={ref}
          {...buttonProps}
        >
          {children}
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      );
    }
  );
