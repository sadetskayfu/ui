import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { memo } from "react";

interface SubsectionTitleProps {
  className?: string;
  children: string;
}

export const SubsectionTitle = memo((props: SubsectionTitleProps) => {
  const { className, children } = props;

  return (
    <h3 className={classNames(styles["title"], [className])}>
      {children}
    </h3>
  );
});
