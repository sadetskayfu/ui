import { ButtonHTMLAttributes, forwardRef, memo, ReactNode} from "react";
import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation, AnimationColor, AnimationDirection, AnimationVariant } from "../../ClickAnimation";
import styles from "./style.module.scss";


export type ButtonVariant = "filled" | "outlined" | "clear"
export type ButtonColor = 'primary' | 'secondary'
export type ButtonMinimalismVariant = "round" | "square"
export type ButtonSize = "small-s" | "small-m" | "small-l" | "medium" | "large"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  minimalism?: ButtonMinimalismVariant;
  animateDirection?: AnimationDirection
  animationColor?: AnimationColor
  animationVariant?: AnimationVariant
  isDisabled?: boolean;
  isReadonly?: boolean
  isKeyBlocked?: boolean;
  isStopFocus?: boolean
  isHiddenLabel?: boolean
  children: string;
  type?: "submit" | "reset" | "button" | undefined;
  Icon?: ReactNode
  tabIndex?: number;
  onClick: () => void;
}

export const Button = memo(
  forwardRef(
    (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement | null>) => {
      const {
        children,
        className,
        animateDirection = 'center',
        animationColor,
        animationVariant,
        isDisabled,
        isReadonly,
        isKeyBlocked,
        isStopFocus,
        isHiddenLabel,
        variant = "filled",
        size = "medium",
        color = 'primary',
        minimalism,
        type = "button",
        Icon,
        tabIndex,
        onClick,
        ...otherProps
      } = props;

      const { isAnimating, startAnimation } = useAnimation();

      const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
          if (event.key === "Enter" || event.key === ' ') {
            if(isKeyBlocked) {
              event.preventDefault()
            } else {
              event.preventDefault()
              onClick()
              startAnimation();
            }
          }
      };

      const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(isStopFocus) {
          event.preventDefault();
        }
      };

      const handleClick = () => {
        onClick()
        startAnimation()
      }
    
      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[color],
        styles[size],
        styles[`minimalism__${minimalism}`],
      ];

      const mods: Record<string, boolean | undefined> = {
        [styles["disabled"]]: isDisabled,
        [styles['readonly']]: isReadonly,
        [styles['hidden-label']]: isHiddenLabel,
        [styles['minimalism']]: !!minimalism
      };

      return (
        <button
          className={classNames(styles["button"], additionalClasses, mods)}
          type={type}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          tabIndex={isDisabled || isReadonly ? -1 : tabIndex}
          disabled={isDisabled}
          aria-readonly={isReadonly ? 'true' : 'false'}
          ref={ref}
          {...otherProps}
        >
          <span className={styles["label"]}>{children}</span>
          {Icon && (
            <div className={styles["icon"]}>
              {Icon}
            </div>
          )}
          <ClickAnimation
            variant={!animationVariant && minimalism === 'square' ? 'square' : animationVariant}
            direction={animateDirection}
            color={!animationColor && color === 'primary' && variant === 'filled' ? 'light' : animationColor}
            isAnimating={isAnimating}
          />
        </button>
      );
    }
  )
);
