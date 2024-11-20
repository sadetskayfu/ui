import { classNames } from "@/shared/lib";
import {
  ReactElement,
  useState,
  Children,
  cloneElement,
} from "react";
import styles from "./style.module.scss";
import { AccordionProps } from "../Accordion/Accordion";

interface AccordionGroupProps {
  className?: string;
  children: ReactElement[];
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
        const props: Partial<AccordionProps> = {
          index: index + 1,
          onChangeSelectedIndex: handleChangeSelectedIndex,
          selectedIndex,
        };
        return cloneElement(child as ReactElement, {
          ...props,
        });
      })}
    </div>
  );
};
