import { cloneElement, ReactElement, useId } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

type LabelPosition = 'right' | 'left' | 'top' | 'bottom'
type LabelSize = 'small' | 'medium'

interface FormLabelProps {
  Component: ReactElement;
  label: string;
  id?: string;
  required?: boolean
  disabled?: boolean
  labelPosition?: LabelPosition
  size?: LabelSize
}

export const FormLabel = (props: FormLabelProps) => {
  const { Component, label, id, required, disabled, labelPosition = 'right', size = 'medium' } = props;

  const localLabelId = useId();
  const labelId = id ? id : localLabelId;

  const additionalClasses: Array<string> = [
    styles[labelPosition],
    styles[size]
  ]

  const mods: Record<string, boolean | undefined> = {
    [styles['required']]: required,
    [styles['disabled']]: disabled
  }

  return (
    <label className={classNames(styles['label-wrapper'], additionalClasses, mods)}>
      {cloneElement(Component, { labelId, required, disabled, size })}
      <span id={labelId} className={styles["label"]}>
        {label}
      </span>
    </label>
  );
};
