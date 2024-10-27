import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

interface SectionTitleProps {
  className?: string;
  children: string;
}

export const SectionTitle = (props: SectionTitleProps) => {
  const { className, children } = props;

  return (
    <h2 className={classNames(styles["title"], [className])}>
      {children}
    </h2>
  );
};
