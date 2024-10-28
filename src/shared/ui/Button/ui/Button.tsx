import { ButtonHTMLAttributes, memo } from "react";
import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import styles from "./style.module.scss";
import { AnimationColor, AnimationVariant } from "../../ClickAnimation/ui/ClickAnimation";

export type ButtonVariant = "primary" | "transparent" | "clear";
export type ButtonMinimalismVariant = "round" | "square" | "none";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  minimalism?: ButtonMinimalismVariant;
  isDisabled?: boolean;
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  tabIndex?: number;
  onClick: () => void;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    isDisabled,
    variant = "primary",
    size = "medium",
    minimalism = "none",
	type = 'button',
    Icon,
    tabIndex,
    onClick,
    ...otherProps
  } = props;

  const { isAnimating, startAnimation } = useAnimation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      onClick();
      startAnimation();
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
    styles[`minimalism-${minimalism}`],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["disabled"]]: isDisabled,
  };

  const animationVariant: AnimationVariant =
    minimalism === 'square' ? "square" : "circle";
  const animationColor: AnimationColor =
    variant === "primary" ? "light" : "dark";

  return (
    <button
      className={classNames(styles["button"], additionalClasses, mods)}
	  type={type}
      onMouseDown={startAnimation}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      tabIndex={isDisabled ? -1 : tabIndex}
      {...otherProps}
    >
      <span className={styles["label"]}>{children}</span>
      {Icon && (
        <span className={styles["icon"]}>
          <Icon />
        </span>
      )}
      <ClickAnimation
        color={animationColor}
		variant={animationVariant}
        isAnimating={isAnimating}
      />
    </button>
  );
});
