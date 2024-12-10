import { cloneElement, memo, ReactElement } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type TooltipPositionVariant = "left" | "top" | "bottom" | "right";

interface TooltipProps {
  className?: string;
  position?: TooltipPositionVariant;
  children: ReactElement;
  text: string | number;
  clickableTooltip?: boolean
}

export const Tooltip = memo((props: TooltipProps) => {
  const { className, position = "top", children, text, clickableTooltip } = props;

  const mods: Record<string, boolean | undefined> = {
    [styles['clickable']]: clickableTooltip
  }

  return (
    <div className={classNames(styles["container"], [className], mods)}>
      <div >
        {cloneElement(children, {className: styles['trigger-component']})}
      </div>
      <div
        className={classNames(styles["tooltip-wrapper"], [styles[position]])}
      >
        <div className={styles["tooltip"]}>
          <p className={styles["content"]}>{text}</p>
        </div>
      </div>
    </div>
  );
});
