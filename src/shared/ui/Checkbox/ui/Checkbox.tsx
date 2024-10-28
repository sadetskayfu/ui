import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "../../ClickAnimation";
import { memo } from "react";
import styles from "./style.module.scss";

type CheckboxSize = "small" | "medium" | "large";

interface CheckboxProps {
  className?: string;
  size?: CheckboxSize;
  id?: string
  hiddenLabel?: boolean
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
    hiddenLabel,
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
      ></input>
      <span className={styles["checkbox"]}>
        <span className={styles['hover']}>
          <ClickAnimation isAnimating={isAnimating} />
        </span>
      </span>
      {!hiddenLabel && <span>{label}</span>}
    </label>
  );
});
