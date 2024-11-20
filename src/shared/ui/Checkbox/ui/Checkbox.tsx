import { classNames, handleRipple } from "@/shared/lib";
import { memo, useRef } from "react";
import styles from "./style.module.scss";
import { RippleWrapper } from "../../RippleWrapper";
import { Icon } from "@/shared/ui/Icon";

export type CheckboxVariant = "filled" | "outlined" | "clear";
export type CheckboxSize = "small" | "medium";
export type CheckboxIconVariant = "favorite" | null;
export type CheckboxColor = 'primary' | 'red'

interface CheckboxProps {
  className?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  color?: CheckboxColor
  iconVariant?: CheckboxIconVariant;
  label: string;
  name?: string;
  isChecked: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isHiddenLabeL?: boolean;
  onToggle: () => void;
  tabIndex?: number;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    size = "medium",
    variant = "filled",
    color = 'primary',
    iconVariant = null,
    label,
    name,
    isDisabled,
    isRequired,
    isChecked,
    isHiddenLabeL,
    onToggle,
    tabIndex = 0,
  } = props;

  const rippleWrapperRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleToggle = () => {
    onToggle();
    handleRipple(rippleWrapperRef, true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[variant],
    styles[color]
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["checked"]]: isChecked,
    [styles["required"]]: isRequired,
    [styles["disabled"]]: isDisabled,
    [styles["hidden-label"]]: isHiddenLabeL,
  };

  return (
    <label
      className={classNames(styles["wrapper"], additionalClasses, mods)}
      tabIndex={isDisabled ? -1 : tabIndex}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-disabled={isDisabled ? "true" : "false"}
      aria-checked={isChecked}
    >
      <input
        ref={inputRef}
        className="visually-hidden"
        type="checkbox"
        value={name}
        name={name}
        onChange={handleToggle}
        tabIndex={-1}
        disabled={isDisabled}
        required={isRequired}
        checked={isChecked}
        aria-hidden="true"
      ></input>
      <div className={styles["checkbox-wrapper"]}>
        <div className={styles["checkbox"]}>
          <div className={styles["icon"]}>
            {!iconVariant && (
              <Icon color="light" variant="check-mark" size="custom-size" />
            )}
            {iconVariant === "favorite" && (
              <>
                <Icon
                  variant="heart"
                  size="custom-size"
                  color='secondary'
                  fillVariant={"outlined"}
                />
                <Icon
                  className={styles['checked-icon']}
                  variant="heart"
                  size="custom-size"
                  color={color}
                  fillVariant={"filled"}
                />
              </>
            )}
          </div>
        </div>
        <RippleWrapper className={styles['ripple']} ref={rippleWrapperRef} />
      </div>
      <span className={styles["label"]}>{label}</span>
    </label>
  );
});
