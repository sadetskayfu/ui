import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { classNames } from "@/shared/lib";
import { AnimationDirection } from "../../ClickAnimation";
import { memo } from "react";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";
import ArrowIcon from "@/shared/assets/icons/arrow.svg?react";
import styles from "./style.module.scss";

export type IconButtonVariant =
  | "cross"
  | "arrow"
  | "password"
  | "pagination"
  | "check-mark"
  | "clear";
export type IconButtonSize = "small" | "medium" | "large";

interface IconButtonProps {
  className?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  animateDirection?: AnimationDirection;
  isClickable?: boolean;
  isActive?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isStopFocus?: boolean;
  tabIndex?: number;
  children: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const IconButton = memo((props: IconButtonProps) => {
  const {
    className,
    variant = "clear",
    size = "medium",
    animateDirection = "center",
    tabIndex = 0,
    isClickable = true,
    isActive,
    isReadonly,
    isDisabled,
    isStopFocus,
    children,
    Icon,
    onClick,
  } = props;

  const { isAnimating, startAnimation } = useAnimation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startAnimation();
      onClick?.();
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isStopFocus) {
      event.preventDefault();
    }
    startAnimation();
  };

  const mods: Record<string, boolean | undefined> = {
    [styles["disabled"]]: isDisabled,
    [styles["readonly"]]: isReadonly,
    [styles["active"]]: isActive,
    [styles["clickable"]]: isClickable,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
  ];

  if (!isClickable) {
    return (
      <span className={classNames(styles["button"], additionalClasses, mods)}>
        {Icon && (
          <span className={styles["icon"]}>
            <Icon />
          </span>
        )}
        {variant === "cross" && (
          <span className={styles["icon"]}>
            <CrossIcon />
          </span>
        )}
        {variant === "arrow" && (
          <span className={styles["icon"]}>
            <ArrowIcon />
          </span>
        )}
        <span className="visually-hidden">{children}</span>
      </span>
    );
  }

  return (
    <button
      className={classNames(styles["button"], additionalClasses, mods)}
      onClick={onClick}
      tabIndex={isReadonly || isDisabled ? -1 : tabIndex}
      type="button"
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      disabled={isDisabled}
      aria-readonly={isReadonly}
    >
      <span className={styles["hover"]}>
        <ClickAnimation
          isAnimating={isAnimating}
          direction={animateDirection}
        />
      </span>
      {Icon && (
        <span className={styles["icon"]}>
          <Icon />
        </span>
      )}
      {variant === "cross" && (
        <span className={styles["icon"]}>
          <CrossIcon />
        </span>
      )}
      {variant === "arrow" && (
        <span className={styles["icon"]}>
          <ArrowIcon />
        </span>
      )}
      <span className="visually-hidden">{children}</span>
    </button>
  );
});
