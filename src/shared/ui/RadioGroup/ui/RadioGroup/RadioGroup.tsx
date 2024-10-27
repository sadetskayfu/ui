import { classNames } from "@/shared/lib";
import { memo, useMemo } from "react";
import { Radio, RadioSize } from "../Radio/Radio";
import styles from "./style.module.scss";

type Direction = "horizontal" | "vertical";


interface RadioItem {
  value: string;
  label: string;
}

interface RadioGroupProps {
  className?: string;
  classNameRadio?: string
  size?: RadioSize
  name: string;
  title: string;
  selectedItem: string;
  items: RadioItem[];
  onChange: (value: string) => void;
  direction?: Direction;
  tabIndex?: number
}

export const RadioGroup = memo((props: RadioGroupProps) => {
  const {
    className,
    classNameRadio,
    size = 'middle',
    title,
    selectedItem,
    items,
    name,
    onChange,
    direction = "vertical",
    tabIndex = 0
  } = props;

  const renderItems = useMemo(() => {
    const radioProps = { selectedItem, onChange, name, tabIndex, size, className: classNameRadio };

    return items.map((item) => {
      return (
        <Radio
          value={item.value}
          label={item.label}
          key={item.value}
          {...radioProps}
        />
      );
    });
  }, [items, selectedItem, onChange, name, tabIndex, size, classNameRadio]);

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[direction],
  ];

  return (
    <fieldset className={classNames(styles["radios"], additionalClasses)}>
      <legend className='visually-hidden'>{title}</legend>
      {renderItems}
    </fieldset>
  );
});
