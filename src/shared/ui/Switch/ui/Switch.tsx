import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { memo } from "react";

export type SwitchSize = "small" | "medium"

interface SwitchProps {
  className?: string;
  size?: SwitchSize;
  id?: string
  label?: string;
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
    id,
    size = "medium",
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
      <div className={styles["toggle-switch"]}>
        <span className={styles["switch"]}>
          <span className={styles['hover']}>
            <ClickAnimation isAnimating={isAnimating} />
          </span>
        </span>
      </div>
      {label && <span className={styles['label']}>{label}</span>}
    </label>
  );
});
