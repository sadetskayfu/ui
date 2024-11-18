import { classNames } from "@/shared/lib";
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { Options } from "../Options/Options";
import { Chip } from "@/shared/ui/Chip";
import { Icon } from "@/shared/ui/Icon";

export type SelectVariant = "outlined";
export type SelectSize = "medium" | "large";
export type SelectLabelVariant = "jump" | "static";

export interface Option {
  id: string;
  label: string;
}

interface SelectProps {
  className?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  labelVariant?: SelectLabelVariant;
  placeholder?: string;
  label: string;
  value: string | string[];
  onSelect: (values: string | string[]) => void;
  options: Record<string, Option>;
  tabIndex?: number;
  isRequired?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    variant = "outlined",
    size = "medium",
    labelVariant = "static",
    placeholder,
    label,
    value,
    options,
    onSelect,
    tabIndex = 0,
    isRequired,
    isReadonly,
    isDisabled,
    errorMessage,
    onBlur,
    onFocus,
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    value
  );

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const handleToggleVisibleMenu = () => {
    setIsVisibleMenu((prev) => !prev);
  };

  const handleOpenMenu = () => {
    setIsVisibleMenu(true);
  };

  const handleCloseMenu = () => {
    setIsVisibleMenu(false);
  };

  const handleSelect = useCallback(
    (id: string) => {
      if (Array.isArray(selectedValues)) {
        const currentValues = [...selectedValues];
        let newValues: string[] = [];
        const alreadyExistingValue = currentValues.filter(
          (item) => item === id
        );

        if (alreadyExistingValue.length > 0) {
          newValues = currentValues.filter((item) => item !== id);
        } else {
          newValues = [...currentValues];
          newValues.push(id);
        }
        setSelectedValues(newValues);
        onSelect(newValues);
      }
      if (typeof selectedValues === "string") {
        const newValue = selectedValues === id ? "" : id;
        setSelectedValues(newValue);
        onSelect(newValue);
      }
    },
    [selectedValues, onSelect]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (Array.isArray(selectedValues)) {
        const currentValues = [...selectedValues];
        const newValues = currentValues.filter((item) => item !== id);
        setSelectedValues(newValues);
        onSelect(newValues);
      }
      fieldRef.current?.focus();
    },
    [selectedValues, onSelect]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || (event.key === " " && !isVisibleMenu)) {
      event.preventDefault();
      handleOpenMenu();
    }
  };

  const handleBlur = () => {
    onBlur?.();
    handleCloseMenu();
  };

  const getOptionsArray = useMemo(() => {
    return Object.values(options);
  }, [options]);

  const getSelectedValues = useMemo((): Option[] => {
    const values: Option[] = [];

    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      selectedValues.forEach((item) => {
        values.push(options[item]);
      });
      return values;
    }
    if (typeof selectedValues === "string" && selectedValues.length > 0) {
      values.push(options[selectedValues]);
      return values;
    }
    return [];
  }, [options, selectedValues]);

  const renderSelectedValues = useMemo(() => {
    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      return getSelectedValues.map((item) => {
        return (
          <Chip
            color="secondary"
            variant="filled"
            size="small"
            isStopFocus
            onClose={() => handleDelete(item.id)}
            key={item.id}
          >
            {item.label}
          </Chip>
        );
      });
    }
  }, [getSelectedValues, selectedValues, handleDelete]);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const isDirty = selectedValues.length > 0;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
    styles[labelVariant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["required"]]: isRequired,
    [styles["disabled"]]: isDisabled,
    [styles["readonly"]]: isReadonly,
    [styles["dirty"]]: isDirty,
    [styles["visible-menu"]]: isVisibleMenu,
    [styles["errored"]]: !!errorMessage,
  };

  const currentTabIndex = isDisabled || isReadonly ? -1 : tabIndex;

  return (
    <div className={classNames(styles["select"], additionalClasses, mods)}>
      {labelVariant === "static" && (
        <span className={styles["label"]}>{label}</span>
      )}
      <div className={styles["field-container"]}>
        <div
          className={classNames(styles["field"], [], {
            [styles["dirty"]]: isDirty,
          })}
          ref={fieldRef}
          tabIndex={currentTabIndex}
          id={id}
          onClick={handleToggleVisibleMenu}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={onFocus}
          aria-readonly={isReadonly ? 'true' : 'false'}
          aria-disabled={isDisabled ? 'true' : 'false'}
          aria-errormessage={id + 'error'}
        >
          {labelVariant === "jump" && (
            <span className={styles["label"]}>{label}</span>
          )}
          {typeof selectedValues === "string" ? (
            <span>{getSelectedValues[0]?.label}</span>
          ) : (
            <div className={styles["chips"]}>{renderSelectedValues}</div>
          )}
          <Icon
            className={styles["arrow-icon"]}
            variant="arrow"
            size="small"
            color="custom-color"
          />
          {placeholder && (
            <span className={styles["placeholder"]}>{placeholder}</span>
          )}
        </div>
        <Options
          onSelect={handleSelect}
          options={getOptionsArray}
          isVisible={isVisibleMenu}
          parentRef={fieldRef}
          selectedValue={selectedValues}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          isCloseAfterSelect={Array.isArray(selectedValues) ? false : true}
        />
      </div>
      {errorMessage && (
        <div className={styles["error-message"]} id={id + 'error'}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
});
