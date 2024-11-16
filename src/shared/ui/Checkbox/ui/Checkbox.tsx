import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { memo } from "react";
import styles from "./style.module.scss";

export type CheckboxVariant = 'filled' | 'outlined'
export type CheckboxSize = "small" | "medium"

interface CheckboxProps {
  className?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant
  id?: string
  isHiddenLabel?: boolean
  label: string;
  name: string;
  isChecked: boolean;
  isRequired?: boolean
  isDisabled?: boolean
  onToggle: (name: string) => void;
  tabIndex?: number;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    id,
    isHiddenLabel,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter") {
      onToggle(name);
      startAnimation();
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
      onMouseDown={startAnimation}
      onKeyDown={handleKeyDown}
    >
      <input
        className="visually-hidden"
        type="checkbox"
        id={id && id}
        value={name}
        name={name}
        onChange={() => onToggle(name)}
        checked={isChecked}
        tabIndex={-1}
        disabled={isDisabled}
        required={isRequired}
      ></input>
      <span className={styles["checkbox"]}>
        <span className={styles['hover']}>
          <ClickAnimation isAnimating={isAnimating} />
        </span>
      </span>
      {!isHiddenLabel && <span className={styles['label']}>{label}</span>}
    </label>
  );
});
