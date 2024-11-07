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
  isHiddenLabel?: boolean
  label: string;
  name: string;
  isDisabled?: boolean
  isRequired?: boolean
  isChecked: boolean;
  onToggle: (name: string) => void;
  tabIndex?: number;
}

export const Switch = memo((props: SwitchProps) => {
  const {
    className,
    id,
    isHiddenLabel,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter") {
      onToggle(name);
      startAnimation();
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
      <div className={styles["toggle-switch"]}>
        <span className={styles["switch"]}>
          <span className={styles['hover']}>
            <ClickAnimation isAnimating={isAnimating} />
          </span>
        </span>
      </div>
      {!isHiddenLabel && <span className={styles['label']}>{label}</span>}
    </label>
  );
});
