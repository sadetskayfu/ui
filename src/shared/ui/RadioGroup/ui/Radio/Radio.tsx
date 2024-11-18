import { ChangeEvent } from "react";
import { classNames } from "@/shared/lib";
import { useAnimation } from "@/shared/lib/hooks";
import { ClickAnimation } from "@/shared/ui/ClickAnimation";
import styles from "./style.module.scss";

export type RadioSize = "small" | "medium"

interface RadioProps {
  className?: string;
  size?: RadioSize;
  name: string;
  id?: string
  isHiddenLabel?: boolean
  label: string;
  selectedValue: string;
  value: string;
  onChange: (value: string) => void;
  tabIndex?: number;
}

export const Radio = (props: RadioProps) => {
  const {
    className,
    size = "medium",
    id,
    isHiddenLabel,
    value,
    name,
    label,
    selectedValue,
    onChange,
    tabIndex = 0,
  } = props;

  const { isAnimating, startAnimation } = useAnimation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    startAnimation()
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === ' ') {
      event.preventDefault()
      onChange(value);
      startAnimation();
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
      tabIndex={tabIndex}
      role="radio"
    >
      <input
        className="visually-hidden"
        type="radio"
        id={id && id}
        name={name}
        value={value}
        checked={value === selectedValue}
        onChange={handleChange}
        tabIndex={-1}
      />
      <span className={styles["emulator"]}>
        <span className={styles['hover']}>
          <ClickAnimation isAnimating={isAnimating} />
        </span>
      </span>
      {!isHiddenLabel && <span>{label}</span>}
    </label>
  );
};
