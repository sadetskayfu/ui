import {
  classNames,
  handleRipple,
  handleRippleMousePosition,
} from "@/shared/lib";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { memo, ReactNode, useRef } from "react";
import styles from "./style.module.scss";
import { RippleWrapper } from "../../RippleWrapper";
import { LinkCheckMark } from "../../LinkCheckMark";

export type CustomLinkVariant = "standart" | "text";
export type CustomLinkColor = "primary";
export type CustomLinkDirection = "vertical" | "horizontal";
export type CustomLinkSize = "medium";

interface CustomLinkProps extends LinkProps {
  className?: string;
  to: string;
  variant?: CustomLinkVariant;
  size?: CustomLinkSize;
  color?: CustomLinkColor;
  direction?: CustomLinkDirection;
  isDisabled?: boolean;
  isExternal?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  isHiddenLabeL?: boolean;
  children: string;
  Icon?: ReactNode;
  tabIndex?: number;
}

export const CustomLink = memo((props: CustomLinkProps) => {
  const {
    className,
    variant = "standart",
    color = "primary",
    direction = "horizontal",
    size = "medium",
    children,
    to,
    isExternal,
    isButton,
    isHiddenLabeL,
    onClick,
    Icon,
    tabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

  const location = useLocation();

  const isActive = location.pathname === to;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRipple(rippleWrapperRef);
      onClick?.()
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    handleRippleMousePosition(rippleWrapperRef, event);
    onClick?.()
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[color],
    styles[direction],
    styles[size],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["active"]]: isActive,
    [styles["hidden-label"]]: isHiddenLabeL,
    [styles["is-button"]]: isButton
  };

  if(isButton) {
    return (
      <button
      className={classNames(styles["link"], additionalClasses, mods)}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      {Icon && variant !== "text" && (
        <div className={styles["icon"]}>{Icon}</div>
      )}
      <span className={styles["label"]}>{children}</span>
      <RippleWrapper ref={rippleWrapperRef} />
    </button>
    )
  }

  if (isExternal) {
    return (
      <a
        className={classNames(styles["link"], additionalClasses)}
        href={to}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
        onClick={handleClick}
      >
        {Icon && variant !== "text" && (
          <div className={styles["icon"]}>{Icon}</div>
        )}
        <span className={styles["label"]}>{children}</span>
        <RippleWrapper ref={rippleWrapperRef} />
      </a>
    );
  }

  return (
    <Link
      className={classNames(styles["link"], additionalClasses, mods)}
      to={to}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      {Icon && variant !== "text" && (
        <div className={styles["icon"]}>{Icon}</div>
      )}
      <span className={styles["label"]}>{children}</span>
      <LinkCheckMark
        position={direction === "vertical" ? "right" : "left"}
        isActive={isActive}
      />
      <RippleWrapper ref={rippleWrapperRef} />
    </Link>
  );
});
