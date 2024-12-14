import { ReactElement } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

type BadgePosition = "top-left" | "top-right" | "bottom-right" | "bottom-left";
type BadgeColor = "primary" | "secondary" | "green";
type BadgeOverlap = 'circular' | 'square'
type BadgeVariant = 'filled' | 'clear'
type BadgeSize = 'small' | 'medium'
type BadgeBorder = 'small' | 'none'

interface BadgeProps {
  className?: string;
  children: ReactElement;
  position?: BadgePosition;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  badgeContent?: number | string | ReactElement;
  max?: number;
  overlap?: BadgeOverlap;
  border?: BadgeBorder;
  isVisible?: boolean
}

const getBadgeContent = (value: number | undefined, maxValue: number) => {
  if (!value) return 0;

  let newValue: string | number = 0;

  if (value > maxValue) {
    newValue = maxValue + "+";
  } else {
    newValue = value;
  }

  return newValue;
};

export const Badge = (props: BadgeProps) => {
  const {
    children,
    position = "top-right",
    color = "primary",
    overlap = 'square',
    variant = 'filled',
    size = 'medium',
    border = 'small',
    badgeContent,
    max,
    className,
    isVisible,
  } = props;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[position],
    styles[color],
    styles[overlap],
    styles[variant],
    styles[size],
    styles[border],
  ];

  const badgeContentIsNumber = typeof badgeContent === 'number'

  const content = max && badgeContentIsNumber ? getBadgeContent(badgeContent, max) : badgeContent;

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible ? isVisible : (badgeContentIsNumber ? badgeContent > 0 : undefined),
  };

  return (
    <div className={classNames(styles["container"], additionalClasses, mods)}>
      {children}
      <span className={styles["badge"]}>{content}</span>
    </div>
  );
};
