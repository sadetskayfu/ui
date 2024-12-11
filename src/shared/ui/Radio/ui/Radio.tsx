import { InputHTMLAttributes, memo, useRef } from "react";
import { classNames, handleRipple } from "@/shared/lib";
import styles from "./style.module.scss";
import { RippleWrapper } from "@/shared/ui/RippleWrapper";

export type RadioSize = "small" | "medium"
export type RadioVariant = "filled" | "outlined"

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "value"
  | "onChange"
  | "checked"
  | "name"
  | "disabled"
  | "required"
  | "tabIndex"
  | "aria-labelledby"
  | "type"
>;

export interface RadioProps {
  className?: string;
  size?: RadioSize;
  variant?: RadioVariant
  name: string;
  labelId?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
  selectedValue: string;
  tabIndex?: number;
  inputProps?: InputProps;
}

export const Radio = memo((props: RadioProps) => {
  const {
    className,
    size = "medium",
    variant = 'filled',
    name,
    value,
    selectedValue,
    labelId,
    disabled,
    onChange,
    tabIndex = 0,
    inputProps,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null)

  const isChecked = value === selectedValue
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    handleRipple(rippleWrapperRef, true);
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[variant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles['disabled']]: disabled,
    [styles['checked']]: isChecked
  }

  const localTabIndex = disabled ? -1 : tabIndex

  return (
    <label
      className={classNames(styles["radio-wrapper"], additionalClasses, mods)}
    >
      <input
        className={styles["input"]}
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        checked={isChecked}
        tabIndex={localTabIndex}
        disabled={disabled}
        aria-labelledby={labelId ? labelId : undefined}
        {...inputProps}
      />
      <div className={styles["radio"]}>
          <span className={styles['emulator']}></span>
          <RippleWrapper ref={rippleWrapperRef}/>
      </div>
    </label>
  );
});
