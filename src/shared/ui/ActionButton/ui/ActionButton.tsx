import { classNames } from "@/shared/lib";
import PasswordIcon from '@/shared/assets/icons/eye-password.svg?react'
import { memo } from "react";
import { Button } from "../../Button";
import styles from "./style.module.scss";

type ActionButtonVariant = 'password' | 'cross'

interface ActionButtonProps {
  className?: string;
  variant?: ActionButtonVariant
  onClick?: () => void;
  isCrossed?: boolean;
  label: string;
  tabIndex?: number
}

export const ActionButton = memo((props: ActionButtonProps) => {
  const { className, variant = 'cross', isCrossed, label, tabIndex = 0, onClick } = props;

  const mods: Record<string, boolean | undefined> = {
    [styles["crossed"]]: !isCrossed,
  };

  const additionalClasses: Array<string | undefined> = [
    styles[variant],
    className
  ]

  return (
    <Button
      className={classNames(styles["button"], additionalClasses, mods)}
      tabIndex={tabIndex}
      type="button"
      onClick={() => onClick?.()}
      Icon={variant === 'password' && PasswordIcon}
      isStopFocus
      minimalism="round"
      size="small-m"
      variant="clear"
    >
      {label}
    </Button>
  );
});
