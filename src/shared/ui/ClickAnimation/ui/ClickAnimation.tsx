import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

type AnimationTheme = 'circle' | 'square'
type AnimationDirection = 'center' | 'left' | 'right'

interface ClickAnimationProps {
  isAnimation: boolean;
  theme?: AnimationTheme
  direction?: AnimationDirection
  
}

export const ClickAnimation = (props: ClickAnimationProps) => {
  const { isAnimation, theme = 'circle', direction = 'center' } = props;

  const mods: Record<string, boolean> = {
    [styles["active"]]: isAnimation,
  };

  const additionalClasses: Array<string> = [
    styles[theme],
    styles[direction]
  ]

  return (
    <span className={classNames(styles["animation"], additionalClasses, mods)}></span>
  );
};
