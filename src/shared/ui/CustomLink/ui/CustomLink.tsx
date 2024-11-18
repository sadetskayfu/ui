import { classNames } from "@/shared/lib";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { ClickAnimation } from "../../ClickAnimation";
import { useAnimation } from "@/shared/lib/hooks";
import { KeyboardEventHandler, memo, ReactNode } from "react";
import styles from "./style.module.scss";
import {
  AnimationColor,
  AnimationDirection,
  AnimationVariant,
} from "../../ClickAnimation/ui/ClickAnimation";

export type CustomLinkVariant =
  | "filled"
  | "outlined"
  | "clear"
  | "standart"
  | "text";
export type CustomLinkColor = "primary" | "secondary";
export type CustomLinkMinimalismVariant = "round" | "square";
export type CustomLinkDirection = "vertical" | "horizontal";
export type CustomLinkSize = "small" | "medium" | "large";

interface CustomLinkProps extends LinkProps {
  className?: string;
  to: string;
  variant?: CustomLinkVariant;
  color?: CustomLinkColor;
  minimalism?: CustomLinkMinimalismVariant;
  size?: CustomLinkSize;
  direction?: CustomLinkDirection;
  isDisabled?: boolean;
  isExternal?: boolean;
  isHiddenLabeL?: boolean;
  children: string;
  Icon?: ReactNode;
  tabIndex?: number;
}

export const CustomLink = memo((props: CustomLinkProps) => {
  const {
    className,
    variant = "clear",
    color = "primary",
    minimalism,
    direction = "horizontal",
    size = "medium",
    children,
    to,
    isExternal,
    isHiddenLabeL,
    Icon,
    tabIndex = 0,
  } = props;

  const { isAnimating, startAnimation } = useAnimation();
  const location = useLocation();

  const isActive = location.pathname === to;

  const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = (event) => {
    if (event.key === "Enter") {
      startAnimation();
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[color],
    styles[direction],
    styles[size],
    styles[`minimalism__${minimalism}`],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["active"]]: isActive,
    [styles["hidden-label"]]: isHiddenLabeL,
    [styles["minimalism"]]: !!minimalism,
  };

  const animationDirection: AnimationDirection =
    (variant === "clear" && !minimalism) || isHiddenLabeL ? "left" : "center";
  const animationVariant: AnimationVariant =
    (variant === "clear" && minimalism !== "round") ||
    minimalism === "square" ||
    isHiddenLabeL
      ? "square"
      : "circle";
  const animationColor: AnimationColor =
    color === "primary" && variant === "filled" ? "light" : "dark";

  if (isExternal) {
    return (
      <a
        className={classNames(styles["link"], additionalClasses)}
        href={to}
        onMouseDown={startAnimation}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
      >
        <span className={styles["label"]}>{children}</span>
        {Icon && variant !== "text" && (
          <div className={styles["icon"]}>{Icon}</div>
        )}
        <ClickAnimation
          direction={animationDirection}
          variant={animationVariant}
          color={animationColor}
          isAnimating={isAnimating}
        />
      </a>
    );
  }

  return (
    <Link
      className={classNames(styles["link"], additionalClasses, mods)}
      to={to}
      onMouseDown={startAnimation}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
    >
      <span className={styles["label"]}>{children}</span>
      {Icon && variant !== "text" && (
        <div className={styles["icon"]}>{Icon}</div>
      )}
      <ClickAnimation
        direction={animationDirection}
        variant={animationVariant}
        color={animationColor}
        isAnimating={isAnimating}
      />
    </Link>
  );
});
