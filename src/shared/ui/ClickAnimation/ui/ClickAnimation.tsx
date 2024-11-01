import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

export type AnimationVariant = 'circle' | 'square'
export type AnimationDirection = 'center' | 'left' | 'right'
export type AnimationColor = 'light' | 'dark'

interface ClickAnimationProps {
  isAnimating: boolean;
  variant?: AnimationVariant
  direction?: AnimationDirection
  color?: AnimationColor
  
}

export const ClickAnimation = (props: ClickAnimationProps) => {
  const { isAnimating, variant = 'circle', direction = 'center', color ='dark' } = props;

  const mods: Record<string, boolean> = {
    [styles["active"]]: isAnimating,
  };

  const additionalClasses: Array<string> = [
    styles[variant],
    styles[direction],
    styles[color]
  ]
  return (
    <span className={classNames(styles["animation"], additionalClasses, mods)}></span>
  );
};
