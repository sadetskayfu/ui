import { memo, useRef } from "react";
import { classNames, handleRipple } from "@/shared/lib";
import styles from "./style.module.scss";
import { RippleWrapper } from "@/shared/ui/RippleWrapper";

export type RadioSize = "small" | "medium"
export type RadioVariant = "filled" | "outlined"

export interface RadioProps {
  className?: string;
  size?: RadioSize;
  variant?: RadioVariant
  name?: string;
  label: string;
  legend?: string
  selectedValue?: string;
  value: string;
  isDisabled?: boolean
  onChange?: (value: string) => void;
  tabIndex?: number;
}

export const Radio = memo((props: RadioProps) => {
  const {
    className,
    size = "medium",
    variant = 'filled',
    value,
    name,
    label,
    legend,
    selectedValue,
    isDisabled,
    onChange,
    tabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isChecked = value === selectedValue

  const handleChange = () => {
    onChange?.(value);
    handleRipple(rippleWrapperRef, true)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if ((event.key === "Enter" || event.key === ' ') && !isChecked) {
      event.preventDefault()
      inputRef.current?.click()
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[variant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles['disabled']]: isDisabled
  }

  return (
    <label
      className={classNames(styles["wrapper"], additionalClasses, mods)}
      onKeyDown={handleKeyDown}
      role="radio"
      tabIndex={isDisabled ? -1 : tabIndex}
      aria-label={`${legend} ${label}`}
      aria-checked={isChecked}
      aria-disabled={isDisabled ? 'true' : 'false'}
    >
      <input
        ref={inputRef}
        className="visually-hidden"
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        checked={isChecked}
        tabIndex={-1}
        disabled={isDisabled}
        aria-hidden='true'
      />
      <div className={styles["radio-wrapper"]}>
          <span className={styles['radio']}></span>
          <RippleWrapper className={styles['ripple']} ref={rippleWrapperRef}/>
      </div>
      <span>{label}</span>
    </label>
  );
});
