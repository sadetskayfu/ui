import { ButtonHTMLAttributes, forwardRef, LinkHTMLAttributes, memo, ReactNode,  useRef } from "react";
import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import { Link } from "react-router-dom";
import { RippleWrapper } from "@/shared/ui/RippleWrapper";
import styles from "./style.module.scss";

type HTMLLinkProps = Omit<LinkHTMLAttributes<HTMLAnchorElement>, "href" | "tabIndex" | "onKeyDown" | "onClick" | "role">
type HTMLButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "tabIndex" | "onClick" | "onKeyDown" | "role">

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
  tabIndex?: number;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  to?: string;
  role?: string;
  buttonProps?: HTMLButtonProps
  linkProps?: HTMLLinkProps
}

const MenuItem = memo(
  forwardRef((props: MenuItemProps, ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement | null>) => {
    const {
      className,
      children,
      isLink,
      isExternalLink,
      onClick,
      onKeyDown,
      tabIndex = 0,
      StartIcon,
      EndIcon,
      to = "",
      role = "menuitem",
      buttonProps,
      linkProps,
      ...otherProps
    } = props;

    const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);
    const localLinkRef = useRef<HTMLAnchorElement | null>(null)
    const linkRef = ref ? ref as React.RefObject<HTMLAnchorElement> : localLinkRef

    const handleClick = (event: React.MouseEvent) => {
      onClick?.();
      handleRippleMousePosition(rippleWrapperRef, event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        if (isLink || isExternalLink) {
          linkRef.current?.click();
        } else {
          onClick?.();
        }

        handleRipple(rippleWrapperRef);
      }
      onKeyDown?.()
    };

    if (isLink)
      return (
        <li
          className={classNames(styles["menu-item"], [className])}
          role="none"
        >
          <Link
            className={styles["link"]}
            role={role}
            tabIndex={tabIndex}
            to={to}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            ref={linkRef}
            {...linkProps}
            {...otherProps}
          >
            {StartIcon && StartIcon}
            {children}
            {EndIcon && <span className={styles["end-icon"]}>{EndIcon}</span>}
            <RippleWrapper ref={rippleWrapperRef} />
          </Link>
        </li>
      );

    if (isExternalLink)
      return (
        <li
          className={classNames(styles["menu-item"], [className])}
          role="none"
        >
          <a
            className={styles["link"]}
            role={role}
            tabIndex={tabIndex}
            href={to}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            ref={linkRef}
            {...linkProps}
            {...otherProps}
          >
            {StartIcon && StartIcon}
            {children}
            {EndIcon && <span className={styles["end-icon"]}>{EndIcon}</span>}
          </a>
        </li>
      );

    return (
      <li
        className={classNames(styles["menu-item"], [className])}
        role="none"
      >
        <button
          className={styles["button"]}
          role={role}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={tabIndex}
          ref={ref && ref as React.ForwardedRef<HTMLButtonElement>}
          {...buttonProps}
          {...otherProps}
        >
          {StartIcon && StartIcon}
          {children}
          {EndIcon && <span className={styles["end-icon"]}>{EndIcon}</span>}
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      </li>
    );
  }
));

export default MenuItem;
