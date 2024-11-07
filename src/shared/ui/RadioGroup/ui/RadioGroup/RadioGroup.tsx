import { classNames } from "@/shared/lib";
import { memo, useMemo } from "react";
import { Radio, RadioSize } from "../Radio/Radio";
import { Group } from "@/shared/ui/Group";
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
  selectedValue: string;
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
    selectedValue,
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
    const radioProps = { selectedValue, onChange, name, tabIndex, size, className: classNameRadio, isHiddenLabel: isHiddenRadioLabel, id: radioId };

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
  }, [items, selectedValue, onChange, name, tabIndex, size, classNameRadio, isHiddenRadioLabel, radioId]);

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size]
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles['hidden-title']]: isHiddenTitle
  }

  return (
    <fieldset className={classNames(styles["radios"], additionalClasses, mods)} role='group' aria-orientation={direction}>
      <legend className={styles['title']}>{title}</legend>
      <Group direction={direction} gap={size}>
        {renderItems}
      </Group>
    </fieldset>
  );
});
