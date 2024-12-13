import { ReactElement } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type AlertVariant = "filled" | "outlined" | "clear";
type AlertSeverity = "success" | "info" | "warning" | "error";
type AlertBorderRadius = "small" | "none";

interface AlertProps {
  className?: string;
  Action?: ReactElement;
  Icon?: ReactElement;
  children: string;
  title?: string;
  variant?: AlertVariant;
  severity?: AlertSeverity;
  borderRadius?: AlertBorderRadius;
}

export const Alert = (props: AlertProps) => {
  const {
    Action,
    Icon,
    children,
    title,
    variant = "filled",
    severity = "success",
    borderRadius = "none",
    className,
  } = props;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[severity],
    styles[borderRadius],
  ];

  return (
    <div
      role="alert"
      className={classNames(styles["alert"], additionalClasses)}
    >
      {Icon}
      <div className={styles['content']}>
        {title && <span className={styles["title"]}>{title}</span>}
        <p className={styles["message"]}>{children}</p>
      </div>
      <div className={styles["action"]}>{Action}</div>
    </div>
  );
};
