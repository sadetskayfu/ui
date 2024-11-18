import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { memo } from "react";
import styles from "./style.module.scss";
import { Icon } from "../../Icon";

export type CheckboxVariant = 'filled' | 'outlined'
export type CheckboxSize = "small" | "medium"

interface CheckboxProps {
  className?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant
  id?: string
  label?: string;
  name?: string;
  isChecked: boolean;
  isRequired?: boolean
  isDisabled?: boolean
  onToggle: () => void;
  tabIndex?: number;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    id,
    size = "medium",
    variant = 'filled',
    label,
    name,
    isDisabled,
    isRequired,
    isChecked,
    onToggle,
    tabIndex = 0,
  } = props;

  const { isAnimating, startAnimation } = useAnimation();

  const handleToggle = () => {
    onToggle()
    startAnimation()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[variant]
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["checked"]]: isChecked,
    [styles['required']]: isRequired,
    [styles['disabled']]: isDisabled
  };

  return (
    <label
      className={classNames(styles["wrapper"], additionalClasses, mods)}
      tabIndex={isDisabled? -1 : tabIndex}
      onKeyDown={handleKeyDown}
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id={id && id}
        value={name}
        name={name}
        onChange={handleToggle}
        checked={isChecked}
        tabIndex={-1}
        disabled={isDisabled}
        required={isRequired}
      ></input>
      <div className={styles["checkbox"]}>
        <Icon className={styles['icon']} color="light" variant="check-mark" size="custom-size" />
        <span className={styles['hover']}>
          <ClickAnimation isAnimating={isAnimating} />
        </span>
      </div>
      {label && <span className={styles['label']}>{label}</span>}
    </label>
  );
});
