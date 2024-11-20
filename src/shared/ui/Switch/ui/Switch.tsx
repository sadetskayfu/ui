import { classNames, handleRipple } from "@/shared/lib";
import styles from "./style.module.scss";
import { memo, useRef } from "react";
import { RippleWrapper } from "../../RippleWrapper";

export type SwitchSize = "small" | "medium"

interface SwitchProps {
  className?: string;
  size?: SwitchSize;
  label: string;
  name?: string;
  isDisabled?: boolean
  isRequired?: boolean
  isChecked: boolean;
  onToggle: () => void;
  tabIndex?: number;
}

export const Switch = memo((props: SwitchProps) => {
  const {
    className,
    size = "medium",
    label,
    name,
    isDisabled,
    isRequired,
    isChecked,
    onToggle,
    tabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleToggle = () => {
    onToggle()
    handleRipple(rippleWrapperRef, true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === ' ') {
      event.preventDefault()
      inputRef.current?.click()
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["checked"]]: isChecked,
    [styles['disabled']]: isDisabled,
    [styles['required']]: isRequired
  };

  return (
    <label
      className={classNames(styles["wrapper"], additionalClasses, mods)}
      tabIndex={isDisabled? -1 : tabIndex}
      onKeyDown={handleKeyDown}
      aria-checked={isChecked}
      aria-disabled={isDisabled ? 'true' : 'false'}
    >
      <input
        className="visually-hidden"
        ref={inputRef}
        type="checkbox"
        value={name}
        name={name}
        onChange={handleToggle}
        checked={isChecked}
        tabIndex={-1}
        disabled={isDisabled}
        required={isRequired}
        aria-hidden={isDisabled ? 'true' : 'false'}
      ></input>
      <div className={styles["track"]}>
        <div className={styles["switch-wrapper"]}>
          <span className={styles['switch']}></span>
          <RippleWrapper className={styles['ripple']} ref={rippleWrapperRef}/>
        </div>
      </div>
      <span className={styles['label']}>{label}</span>
    </label>
  );
});
