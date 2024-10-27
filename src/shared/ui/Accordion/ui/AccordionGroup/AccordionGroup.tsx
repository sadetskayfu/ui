import { classNames } from "@/shared/lib";
import {
  ReactElement,
  ReactNode,
  useState,
  Children,
  cloneElement,
} from "react";
import styles from "./style.module.scss";

export interface AccordionGroupChildrenProps {
  index: number;
  onChangeSelectedIndex: (index: number | null) => void;
  selectedIndex: number | null;
}

interface AccordionGroupProps {
  className?: string;
  children: ReactNode;
}

export const AccordionGroup = (props: AccordionGroupProps) => {
  const { className, children } = props;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleChangeSelectedIndex = (index: number | null) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classNames(styles["accordion-group"], [className])}>
      {Children.map(children, (child, index) => {
        const AccordionGroupChildrenProps: AccordionGroupChildrenProps = {
          index: index + 1,
          onChangeSelectedIndex: handleChangeSelectedIndex,
          selectedIndex,
        };

        return cloneElement(child as ReactElement, {
          ...AccordionGroupChildrenProps,
        });
      })}
    </div>
  );
};
