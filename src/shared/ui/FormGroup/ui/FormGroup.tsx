import { Children, cloneElement, ReactElement, useId, useMemo } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type FormGroupSize = "small" | "medium";
type FormGroupDirection = "horizontal" | "vertical";

interface FormGroupProps {
  className?: string;
  children: ReactElement[];
  label: string;
  errorMessage?: string;
  tabIndex?: number;
  size?: FormGroupSize;
  direction?: FormGroupDirection;
  required?: boolean;
  hiddenLegend?: boolean;
}

export const FormGroup = (props: FormGroupProps) => {
  const {
    className,
    children,
    label,
    errorMessage,
    tabIndex,
    size = "medium",
    direction = "horizontal",
    required,
    hiddenLegend,
  } = props;

  const errorMessageId = useId();

  const renderChildren = useMemo(() => {
    return Children.map(children, (child: ReactElement) => {
      return cloneElement(child, { tabIndex, size });
    });
  }, [children, tabIndex, size]);

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[size],
    styles[direction],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["errored"]]: !!errorMessage,
    [styles["required"]]: required,
    [styles["hidden-legend"]]: hiddenLegend,
  };

  return (
    <fieldset
      className={classNames(styles["form-group"], additionalClasses, mods)}
      aria-required={required ? "true" : undefined}
      aria-errormessage={errorMessage ? errorMessageId : undefined}
    >
      <legend className={styles["legend"]}>{label}</legend>
      <div className={styles["items"]}>{renderChildren}</div>
      {errorMessage && (
        <p id={errorMessageId} className={styles["error-message"]}>{errorMessage}</p>
      )}
    </fieldset>
  );
};
