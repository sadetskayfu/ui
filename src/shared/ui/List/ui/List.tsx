import { Children, cloneElement, ReactElement } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface ListProps {
  children: ReactElement[];
}

export const List = (props: ListProps) => {
  const { children } = props;

  return (
    <ul className={classNames(styles['list'])}>
        {children}
    </ul>
  );
};
