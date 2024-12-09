import {
  ButtonHTMLAttributes,
  forwardRef,
  LinkHTMLAttributes,
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

type LinkProps = Omit<
  LinkHTMLAttributes<HTMLAnchorElement>,
  "href" | "tabIndex"
>;
type OtherButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "tabIndex" | "disabled"
>;

interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  readonly?: boolean;
  stopFocus?: boolean;
  isLink?: boolean;
  isExternalLink?: boolean;
  to?: string;
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  tabIndex?: number;
  onClick?: () => void;
  linkProps?: LinkProps;
  buttonProps?: OtherButtonProps;
}

export const Button = memo(
  forwardRef(
    (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement | null>) => {
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
        type = "button",
        StartIcon,
        EndIcon,
        tabIndex,
        onClick,
        buttonProps,
        linkProps,
      } = props;

      const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);
      const linkRef = useRef<HTMLAnchorElement | null>(null);

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();

          if (readonly) return;

          if (isLink || isExternalLink) {
            linkRef.current?.click();
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
        event.stopPropagation();

        if (readonly) return;

        onClick?.();
        handleRippleMousePosition(rippleWrapperRef, event);
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[color],
        styles[size],
      ];

      const mods: Record<string, boolean | undefined> = {
        [styles["disabled"]]: disabled,
        [styles["readonly"]]: readonly,
      };

      const localTabIndex = disabled ? -1 : tabIndex;

      if (isLink) {
        return (
          <Link
            className={classNames(styles["button"], additionalClasses, mods)}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            to={to}
            tabIndex={localTabIndex}
            ref={linkRef}
            {...linkProps}
          >
            {StartIcon ? StartIcon : undefined}
            {children}
            {EndIcon ? EndIcon : undefined}
            <RippleWrapper ref={rippleWrapperRef} />
          </Link>
        );
      }

      if (isExternalLink) {
        return (
          <a
            className={classNames(styles["button"], additionalClasses, mods)}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            href={to}
            tabIndex={localTabIndex}
            ref={linkRef}
            {...linkProps}
          >
            {StartIcon ? StartIcon : undefined}
            {children}
            {EndIcon ? EndIcon : undefined}
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
          aria-readonly={readonly ? "true" : undefined}
          ref={ref}
          {...buttonProps}
        >
          {StartIcon ? StartIcon : undefined}
          {children}
          {EndIcon ? EndIcon : undefined}
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      );
    }
  )
);
