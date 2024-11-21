import { memo, MouseEventHandler, useRef } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

export type StarSize = 'small' | 'medium' | 'large'

interface StarProps {
  className?: string;
  size?: StarSize
  value: number;
  onChange: (value: number) => void;
  onMouseEnter: (value: number) => void;
  onMouseLeave: () => void;
  isFilled: boolean;
  isThreeQuartersFilled: boolean
  isHalfFilled: boolean;
  isQuarterFilled: boolean
  isReadonly?: boolean
  isDisabled?: boolean
  isPrecise?: boolean
}

export const Star = memo((props: StarProps) => {
  const {
    className,
    size = 'medium',
    value,
    onChange,
    onMouseEnter,
    onMouseLeave,
    isFilled,
    isHalfFilled,
    isThreeQuartersFilled,
    isQuarterFilled,
    isReadonly,
    isDisabled,
    isPrecise,
  } = props;

  const starRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    const currentStar = starRef.current;
    
    if (currentStar && isPrecise) {
      const { clientX } = event;
      const starRect = currentStar.getBoundingClientRect();
      const clickPosition = clientX - starRect.left;

      const isLeftHalf = clickPosition < starRect.width / 2;
      const localValue = isLeftHalf ? value - 0.5 : value;

      onMouseEnter(localValue);
    } else {
      onMouseEnter(value)
    }
  };

  const handleChange: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    const currentStar = starRef.current;

    if (currentStar && isPrecise) {
      const { clientX } = event;
      const starRect = currentStar.getBoundingClientRect();
      const clickPosition = clientX - starRect.left;

      const isLeftHalf = clickPosition < starRect.width / 2;
      const localValue = isLeftHalf ? value - 0.5 : value;

      onChange(localValue);
    } else {
      onChange(value)
    }
    
  };

  const mods: Record<string, boolean | undefined> = {
    [styles["filled"]]: isFilled,
    [styles['three-quarters-filled']]: isThreeQuartersFilled,
    [styles["half-filled"]]: isHalfFilled,
    [styles['quarter-filled']]: isQuarterFilled,
    [styles['readonly']]: isReadonly,
    [styles['disabled']]: isDisabled
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size]
  ]

  return (
    <div
      role="radio"
      ref={starRef}
      onMouseMove={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(handleChange)}
      className={classNames(styles["star"], additionalClasses, mods)}
    >
      <span className={styles["icon"]}></span>
    </div>
  );
});
