import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { memo } from "react";

type TitleVariant = "h3" | "h4";

interface SubsectionTitleProps {
  className?: string;
  children: string;
  titleVariant?: TitleVariant;
}

export const SubsectionTitle = memo((props: SubsectionTitleProps) => {
  const { className, children, titleVariant = 'h3' } = props;

  return (
    <>
      {titleVariant === "h3" ? (
        <h3 className={classNames(styles["title"], [className])}>{children}</h3>
      ) : (
        <h4 className={classNames(styles["title"], [className])}>{children}</h4>
      )}
    </>
  );
});
