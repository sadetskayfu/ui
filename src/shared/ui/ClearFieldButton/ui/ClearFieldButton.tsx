import { classNames } from "@/shared/lib";
import { memo } from "react";
import styles from "./style.module.scss";

interface ClearFieldButtonProps {
  label: string;
  className?: string;
  onClear: () => void;
}

export const ClearFieldButton = memo((props: ClearFieldButtonProps) => {
  const { className, onClear, label } = props;

  const handleStopFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <button
      className={classNames(styles["button"], [className])}
      onClick={onClear}
      type="button"
      onMouseDown={handleStopFocus}
      tabIndex={-1}
    >
      <span className="visually-hidden">{label}</span>
    </button>
  );
});
