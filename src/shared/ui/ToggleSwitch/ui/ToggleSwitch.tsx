import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { useClickAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { memo } from "react";

type ToggleSwitchSize = "small" | "middle" | "large";

interface ToggleSwitchProps {
  className?: string;
  size?: ToggleSwitchSize;
  id?: string
  hiddenLabel?: boolean
  label: string;
  name: string;
  isChecked: boolean;
  onToggle: (name: string) => void;
  tabIndex?: number;
}

export const ToggleSwitch = memo((props: ToggleSwitchProps) => {
  const {
    className,
    id,
    hiddenLabel,
    size = "middle",
    label,
    name,
    isChecked,
    onToggle,
    tabIndex = 0,
  } = props;

  const { isAnimation, handleToggleAnimation } = useClickAnimation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter") {
      onToggle(name);
      handleToggleAnimation();
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
  ];

  const mods: Record<string, boolean> = {
    [styles["checked"]]: isChecked,
  };

  return (
    <label
      className={classNames(styles["wrapper"], additionalClasses, mods)}
      tabIndex={tabIndex}
      onMouseDown={handleToggleAnimation}
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
      ></input>
      <div className={styles["toggle-switch"]}>
        <span className={styles["switch"]}>
          <span className={styles['hover']}>
            <ClickAnimation isAnimation={isAnimation} />
          </span>
        </span>
      </div>
      {!hiddenLabel && <span>{label}</span>}
    </label>
  );
});
