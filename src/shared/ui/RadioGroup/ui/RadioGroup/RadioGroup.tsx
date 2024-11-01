import { classNames } from "@/shared/lib";
import { memo, useMemo } from "react";
import { Radio, RadioSize } from "../Radio/Radio";
import styles from "./style.module.scss";

export type DirectionRadioGroup = "horizontal" | "vertical";


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
  direction?: DirectionRadioGroup;
  isHiddenRadioLabel?: boolean
  isHiddenTitle?: boolean
  radioId?: string
  tabIndex?: number
}

export const RadioGroup = memo((props: RadioGroupProps) => {
  const {
    className,
    classNameRadio,
    size = 'medium',
    title,
    selectedItem,
    items,
    name,
    onChange,
    direction = "vertical",
    isHiddenRadioLabel,
    isHiddenTitle,
    radioId,
    tabIndex = 0
  } = props;

  const renderItems = useMemo(() => {
    const radioProps = { selectedItem, onChange, name, tabIndex, size, className: classNameRadio, isHiddenLabel: isHiddenRadioLabel, id: radioId };

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
  }, [items, selectedItem, onChange, name, tabIndex, size, classNameRadio, isHiddenRadioLabel, radioId]);

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[direction],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles['hidden-title']]: isHiddenTitle
  }

  return (
    <fieldset className={classNames(styles["radios"], additionalClasses, mods)}>
      <legend className={styles['title']}>{title}</legend>
      {renderItems}
    </fieldset>
  );
});
