import { ReactElement } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type BadgePosition = "top-left" | "top-right" | "bottom-right" | "bottom-left";
type BadgeColor = "primary" | "secondary" | "light";

interface BadgeProps {
  className?: string;
  children: ReactElement;
  position?: BadgePosition;
  color?: BadgeColor;
  badgeContent?: number;
  max?: number;
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
    badgeContent,
    max,
    className,
  } = props;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[position],
    styles[color],
  ];

  const content = max ? getBadgeContent(badgeContent, max) : badgeContent;

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: badgeContent ? badgeContent > 0 : undefined,
  };

  return (
    <div className={classNames(styles["container"], additionalClasses, mods)}>
      {children}
      <span className={styles["badge"]}>{content}</span>
    </div>
  );
};
