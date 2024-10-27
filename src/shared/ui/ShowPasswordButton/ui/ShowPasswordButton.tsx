import { classNames } from "@/shared/lib";
import Icon from '@/shared/assets/icons/eye-password.svg?react'
import styles from "./style.module.scss";
import { memo } from "react";

interface ShowButtonPasswordProps {
  className?: string;
  onToggle?: () => void;
  isCrossed?: boolean;
  label: string;
}

export const ShowButtonPassword = memo((props: ShowButtonPasswordProps) => {
  const { isCrossed, className, label, onToggle } = props;

  const handleStopFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const mods: Record<string, boolean | undefined> = {
    [styles["crossed"]]: !isCrossed,
  };

  return (
    <button
      className={classNames(styles["button"], [className], mods)}
      tabIndex={-1}
      type="button"
      onClick={onToggle}
      onMouseDown={handleStopFocus}
    >
      <span className="visually-hidden">{label}</span>
      <span className={styles['icon']}><Icon /></span>
    </button>
  );
});
