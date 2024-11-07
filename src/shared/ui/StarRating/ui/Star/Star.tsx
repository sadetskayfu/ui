import { memo, MouseEventHandler, useRef } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

export type StarSize = 'small' | 'medium' | 'large'

interface StarProps {
  className?: string;
  size?: StarSize
  name: string;
  value: number;
  index: number;
  onChange: (value: number, name: string) => void;
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
    name,
    value,
    index,
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

  const starRef = useRef<HTMLLabelElement>(null);

  const handleMouseEnter: MouseEventHandler<HTMLLabelElement> = (event) => {
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

  const handleChange: MouseEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault()
    const currentStar = starRef.current;

    if (currentStar && isPrecise) {
      const { clientX } = event;
      const starRect = currentStar.getBoundingClientRect();
      const clickPosition = clientX - starRect.left;

      const isLeftHalf = clickPosition < starRect.width / 2;
      const localValue = isLeftHalf ? value - 0.5 : value;

      onChange(localValue, name);
    } else {
      onChange(value, name)
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
    <label
      role="radio"
      aria-checked={isFilled || isHalfFilled ? 'true' : 'false'}
      aria-label={index === 1 ? `${index} star` : `${index} stars`}
      ref={starRef}
      onMouseMove={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(handleChange)}
      className={classNames(styles["star"], additionalClasses, mods)}
    >
      <input
        className="visually-hidden"
        tabIndex={-1}
        type="radio"
        name={name}
        value={index}
      />
      <span className={styles["icon"]}></span>
    </label>
  );
});
