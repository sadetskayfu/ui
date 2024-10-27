import { ChangeEvent } from "react";
import { classNames } from "@/shared/lib";
import { useClickAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "@/shared/ui/ClickAnimation";
import styles from "./style.module.scss";

export type RadioSize = "small" | "middle" | "large";

interface RadioProps {
  className?: string;
  size?: RadioSize;
  name: string;
  id?: string
  hiddenLabel?: boolean
  label: string;
  selectedItem: string;
  value: string;
  onChange: (value: string) => void;
  tabIndex?: number;
}

export const Radio = (props: RadioProps) => {
  const {
    className,
    size = "middle",
    id,
    hiddenLabel,
    value,
    name,
    label,
    selectedItem,
    onChange,
    tabIndex = 0,
  } = props;

  const { isAnimation, handleToggleAnimation } = useClickAnimation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter") {
      onChange(value);
      handleToggleAnimation();
    }
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
  ];

  return (
    <label
      className={classNames(styles["radio"], additionalClasses)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleToggleAnimation}
      tabIndex={tabIndex}
    >
      <input
        className="visually-hidden"
        type="radio"
        id={id && id}
        name={name}
        value={value}
        checked={value === selectedItem}
        onChange={handleChange}
        tabIndex={-1}
      />
      <span className={styles["emulator"]}>
        <span className={styles['hover']}>
          <ClickAnimation isAnimation={isAnimation} />
        </span>
      </span>
      {!hiddenLabel && <span>{label}</span>}
    </label>
  );
};
