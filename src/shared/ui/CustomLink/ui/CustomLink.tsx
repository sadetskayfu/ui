import { classNames } from "@/shared/lib";
import { Link, LinkProps, useLocation } from "react-router-dom";
import { ClickAnimation } from "../../ClickAnimation";
import { useAnimation } from "@/shared/lib/hooks";
import { KeyboardEventHandler, memo} from "react";
import styles from "./style.module.scss";
import {
  AnimationColor,
  AnimationDirection,
  AnimationVariant,
} from "../../ClickAnimation/ui/ClickAnimation";

export type CustomLinkVariant =
  | "primary"
  | "transparent"
  | "clear"
  | "classic"
  | "text"
export type CustomLinkMinimalismVariant = "round" | "square" | "none";
export type CustomLinkDirection = "vertical" | "horizontal";
export type CustomLinkSize = "small" | "medium" | "large";

interface CustomLinkProps extends LinkProps {
  className?: string;
  to: string;
  variant?: CustomLinkVariant;
  minimalism?: CustomLinkMinimalismVariant
  size?: CustomLinkSize;
  direction?: CustomLinkDirection;
  isDisabled?: boolean;
  isExternal?: boolean;
  isHiddenLabeL?: boolean
  children: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  tabIndex?: number;
}

export const CustomLink = memo((props: CustomLinkProps) => {
  const {
    className,
    variant = "clear",
    minimalism = 'none',
    direction = "horizontal",
    size = "medium",
    children,
    to,
    isExternal,
    isDisabled,
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
    styles[direction],
    styles[size],
    styles[`minimalism-${minimalism}`]
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["active"]]: isActive,
    [styles["disabled"]]: isDisabled,
    [styles['hidden-label']]: isHiddenLabeL,
  };

  const animationDirection: AnimationDirection =
    variant === "clear" && minimalism === 'none' || isHiddenLabeL? "left" : "center";
  const animationVariant: AnimationVariant =
    variant === "clear" && minimalism !== 'round' || minimalism === 'square' || isHiddenLabeL ? "square" : "circle";
  const animationColor: AnimationColor =
    variant === "primary" ? "light" : "dark";

  if (isExternal) {
    return (
      <a
        className={classNames(styles["link"], additionalClasses)}
        href={to}
        onMouseDown={startAnimation}
        onKeyDown={handleKeyDown}
        tabIndex={isDisabled ? -1 : tabIndex}
      >
        <span className={styles['label']}>{children}</span>
        {Icon && variant !== 'text' && (
          <span className={styles["icon"]}>
            <Icon />
          </span>
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
      tabIndex={isDisabled ? -1 : tabIndex}
    >
      <span className={styles['label']}>{children}</span>
      {Icon && variant !== 'text' && (
        <span className={styles["icon"]}>
          <Icon />
        </span>
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
