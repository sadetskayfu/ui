import { classNames, handleRipple } from "@/shared/lib";
import { InputHTMLAttributes, memo, ReactElement, useRef } from "react";
import { RippleWrapper } from "../../RippleWrapper";
import { Icon as Checkmark, IconProps } from "@/shared/ui/Icon";
import styles from "./style.module.scss";

export type CheckboxVariant = "filled" | "outlined" | "clear";
export type CheckboxSize = "small" | "medium";
export type CheckboxColor = "primary" | "red";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "onChange"
  | "checked"
  | "name"
  | "disabled"
  | "required"
  | "tabIndex"
  | "aria-labelledby"
  | "type"
>;

interface CheckboxProps {
  className?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  name?: string;
  labelId?: string;
  required?: boolean;
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tabIndex?: number;
  Icon?: ReactElement<IconProps>;
  CheckedIcon?: ReactElement<IconProps>;
  inputProps?: InputProps;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    size = "medium",
    variant = "filled",
    color = "primary",
    name,
    labelId,
    disabled,
    required,
    checked,
    onChange,
    tabIndex = 0,
    Icon,
    CheckedIcon,
    inputProps,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
    handleRipple(rippleWrapperRef, true);
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[variant],
    styles[color],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["checked"]]: checked,
    [styles["required"]]: required,
    [styles["disabled"]]: disabled,
  };

  const localTabIndex = disabled ? -1 : tabIndex

  return (
    <label
      className={classNames(
        styles["checkbox-wrapper"],
        additionalClasses,
        mods
      )}
    >
      <input
        className={styles["input"]}
        type="checkbox"
        value={name}
        name={name}
        onChange={handleChange}
        tabIndex={localTabIndex}
        disabled={disabled}
        required={required}
        checked={checked}
        aria-labelledby={labelId ? labelId : undefined}
        {...inputProps}
      />
      <div className={styles["checkbox"]}>
        {Icon && <span className={styles["icon"]}>{Icon}</span>}
        <span className={styles["checked-icon"]}>
          {CheckedIcon ? CheckedIcon : <Checkmark variant="check-mark" color="light" />}
        </span>
        <RippleWrapper ref={rippleWrapperRef} />
      </div>
    </label>
  );
});
