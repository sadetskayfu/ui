import { memo, ReactNode,  useRef } from "react";
import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import { Link } from "react-router-dom";
import { RippleWrapper } from "@/shared/ui/RippleWrapper";
import styles from "./style.module.scss";

export interface MenuItemProps {
  className?: string;
  children: ReactNode;
  isLink?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
  tabIndex?: number;
  StartIcon?: ReactNode;
  EndIcon?: ReactNode;
  to?: string;
  role?: string;
}

const MenuItem = memo(
  (props: MenuItemProps) => {
    const {
      className,
      children,
      isLink,
      isExternalLink,
      onClick,
      tabIndex = -1,
      StartIcon,
      EndIcon,
      to = "",
      role = "menuitem",
    } = props;

    const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

    const handleClick = (event: React.MouseEvent) => {
      onClick?.();
      handleRippleMousePosition(rippleWrapperRef, event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.();
        handleRipple(rippleWrapperRef);
      }
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
          >
            {StartIcon && <>{StartIcon}</>}
            {children}
            {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
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
          >
            {StartIcon && <>{StartIcon}</>}
            {children}
            {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
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
        >
          {StartIcon && <>{StartIcon}</>}
          {children}
          {EndIcon && <div className={styles["end-icon"]}>{EndIcon}</div>}
          <RippleWrapper ref={rippleWrapperRef} />
        </button>
      </li>
    );
  }
);

export default MenuItem;
