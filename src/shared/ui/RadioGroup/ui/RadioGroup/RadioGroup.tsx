import { classNames } from "@/shared/lib";
import { Children, cloneElement, ReactElement } from "react";
import { RadioProps, RadioSize, RadioVariant } from "../Radio/Radio";
import styles from "./style.module.scss";

export type DirectionRadioGroup = "horizontal" | "vertical";

interface RadioGroupProps {
  className?: string;
  size?: RadioSize;
  variant?: RadioVariant
  name: string;
  legend: string;
  selectedValue: string;
  children: ReactElement[];
  onChange: (value: string) => void;
  direction?: DirectionRadioGroup;
  tabIndex?: number;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    className,
    size = "medium",
    variant = 'filled',
    legend,
    selectedValue,
    name,
    children,
    onChange,
    direction = "vertical",
    tabIndex = 0,
  } = props;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[direction],
    styles[size],
  ];

  return (
    <fieldset
      className={classNames(styles["radios"], additionalClasses)}
      role="group"
    >
      <legend className={styles["legend"]}>{legend}</legend>
      {Children.map(children, (child) => {
        const props: Partial<RadioProps> = {
          legend,
          name,
          onChange,
          tabIndex,
          size,
          variant,
          selectedValue,
        };
        return cloneElement(child as ReactElement, {
          ...props,
        });
      })}
    </fieldset>
  );
};
